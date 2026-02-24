---
name: react-dialog-hub
description: >
  Use this skill when the user mentions dialogs, modals, popups, overlays, confirmations,
  prompts, or alerts in a React project using the react-dialog-hub package.
  Also triggers when the user asks to create a dialog component, set up DialogsProvider,
  call a dialog with await/show, or integrate dialogs with MUI, Radix UI, or HTML dialog elements.
allowed-tools: Read, Write, Edit, Glob, Grep
---

# react-dialog-hub Skill

react-dialog-hub is a headless, type-safe dialog orchestration library for React.
Dialogs are called like async functions: `const result = await show(MyDialog, props)`.
The library works with any UI framework (plain HTML, MUI, Radix UI, Tailwind, etc.).

## Key Concepts

- **`DialogsProvider`**: Wrap the app root once. Manages the dialog stack internally.
- **`useDialogs()`**: Returns `{ show }`. Call from any component inside the provider.
- **`show(Component, props)`**: Returns a `Promise<TResult>`. Resolves when `resolve()` is called inside the dialog.
- **`resolve(result)`**: Closes the dialog and fulfills the promise with a value.
- **`reject(reason?)`**: Closes the dialog and rejects the promise (use with try/catch at the call site).
- **`DialogProps<TProps, TResult, TError>`**: The props type for a dialog component. Merges TProps with `{ resolve, reject }`.

## Installation

```bash
npm install react-dialog-hub
# or
pnpm add react-dialog-hub
# or
yarn add react-dialog-hub
```

Peer dependency: React ^19.2.0

## Step 1 — Provider Setup

Wrap your application root with `DialogsProvider` once:

```tsx
// main.tsx or App.tsx
import { DialogsProvider } from 'react-dialog-hub';

export function App() {
  return (
    <DialogsProvider>
      <YourApp />
    </DialogsProvider>
  );
}
```

If using Radix UI Themes, place `DialogsProvider` inside `<Theme>`:

```tsx
import { Theme } from '@radix-ui/themes';
import { DialogsProvider } from 'react-dialog-hub';

export function App() {
  return (
    <Theme>
      <DialogsProvider>
        <YourApp />
      </DialogsProvider>
    </Theme>
  );
}
```

## Step 2 — Create a Dialog Component

### Pattern A: resolve only (no cancellation)

Use when the dialog always completes (e.g., alert, info modal).

```tsx
import type { DialogProps } from 'react-dialog-hub';

type Props = { message: string };

export function AlertDialog({ message, resolve }: DialogProps<Props>) {
  return (
    <div role="dialog">
      <p>{message}</p>
      <button onClick={() => resolve()}>OK</button>
    </div>
  );
}
```

### Pattern B: resolve with boolean (confirm)

Use when the user can confirm or cancel.

```tsx
import type { DialogProps } from 'react-dialog-hub';

type Props = { message: string };
type Result = boolean;

export function ConfirmDialog({ message, resolve, reject }: DialogProps<Props, Result>) {
  return (
    <div role="dialog">
      <p>{message}</p>
      <button onClick={() => reject()}>Cancel</button>
      <button onClick={() => resolve(true)}>OK</button>
    </div>
  );
}
```

### Pattern C: resolve with typed return value (selection/form)

Use when the dialog returns a selected value.

```tsx
import { useState } from 'react';
import type { DialogProps } from 'react-dialog-hub';

type Props = { title: string; options: string[]; defaultValue?: string };
type Result = string;

export function SelectDialog({ title, options, defaultValue, resolve, reject }: DialogProps<Props, Result>) {
  const [value, setValue] = useState(defaultValue ?? options[0] ?? '');

  return (
    <div role="dialog">
      <p>{title}</p>
      {options.map(option => (
        <label key={option}>
          <input
            type="radio"
            checked={value === option}
            onChange={() => setValue(option)}
          />
          {option}
        </label>
      ))}
      <button onClick={() => reject()}>Cancel</button>
      <button onClick={() => resolve(value)}>OK</button>
    </div>
  );
}
```

### Pattern D: reject with typed error reason

Use when you need to distinguish cancellation from errors.

```tsx
import type { DialogProps } from 'react-dialog-hub';

type Result = void;
type Error = string;  // e.g. 'cancelled'

export function ProgressDialog({ resolve, reject }: DialogProps<Record<string, never>, Result, Error>) {
  // ... async operation
  return (
    <div role="dialog">
      <p>Processing...</p>
      <button onClick={() => reject('cancelled')}>Cancel</button>
    </div>
  );
}
```

## Step 3 — Call the Dialog

```tsx
import { useDialogs } from 'react-dialog-hub';
import { ConfirmDialog } from './ConfirmDialog';
import { SelectDialog } from './SelectDialog';

export function MyComponent() {
  const { show } = useDialogs();

  async function handleDelete() {
    try {
      await show(ConfirmDialog, { message: 'Delete this item?' });
      performDelete();
    } catch {
      // user clicked Cancel (reject() was called)
    }
  }

  async function handleSelect() {
    try {
      const selected = await show(SelectDialog, {
        title: 'Choose a fruit',
        options: ['Apple', 'Banana', 'Cherry'],
      });
      console.log('Selected:', selected); // type: string
    } catch {
      // cancelled
    }
  }

  return (
    <div>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={handleSelect}>Select</button>
    </div>
  );
}
```

## UI Library Integration

### Native HTML `<dialog>` element

Use `useRef` + `useEffect` to call `showModal()` after mount.

```tsx
import { useEffect, useRef, useState } from 'react';
import type { DialogProps } from 'react-dialog-hub';

type Props = { title: string; options: string[] };
type Result = string;

export function NativeSelectDialog({ title, options, resolve, reject }: DialogProps<Props, Result>) {
  const [value, setValue] = useState(options[0] ?? '');
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => ref.current?.showModal(), []);

  return (
    <dialog ref={ref}>
      <p>{title}</p>
      <select value={value} onChange={e => setValue(e.target.value)}>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
      <div>
        <button onClick={() => reject()}>Cancel</button>
        <button onClick={() => resolve(value)}>OK</button>
      </div>
    </dialog>
  );
}
```

Built-in native adapters (no extra dependencies):

```tsx
import { AlertDialog, ConfirmDialog, PromptDialog } from 'react-dialog-hub/native';

const { show } = useDialogs();

await show(AlertDialog, { content: 'Done!' });
const ok = await show(ConfirmDialog, { content: 'Delete?' });
const name = await show(PromptDialog, { content: 'Your name?', value: 'John' });
```

### Material UI (MUI)

Use `<Dialog open>` — no need for `useRef` or `useEffect`.

```tsx
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import type { DialogProps } from 'react-dialog-hub';

type Props = { title?: string; message: string };
type Result = boolean;

export function MuiConfirmDialog({ title, message, resolve, reject }: DialogProps<Props, Result>) {
  return (
    <Dialog open>
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent>{message}</DialogContent>
      <DialogActions>
        <Button onClick={() => reject()}>Cancel</Button>
        <Button onClick={() => resolve(true)} variant="contained">OK</Button>
      </DialogActions>
    </Dialog>
  );
}
```

Built-in MUI adapters (requires `@mui/material`, `@emotion/react`, `@emotion/styled`):

```tsx
import { AlertDialog, ConfirmDialog, PromptDialog } from 'react-dialog-hub/mui';

const ok = await show(ConfirmDialog, { title: 'Confirm', content: 'Delete?' });
```

### Radix UI Themes

Use `<Dialog.Root open>` — the dialog is always open while mounted.

```tsx
import { Button, Dialog } from '@radix-ui/themes';
import type { DialogProps } from 'react-dialog-hub';

type Props = { message: string };

export function RadixConfirmDialog({ message, resolve, reject }: DialogProps<Props>) {
  return (
    <Dialog.Root open>
      <Dialog.Content>
        <Dialog.Title>Confirm</Dialog.Title>
        <Dialog.Description>{message}</Dialog.Description>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 12 }}>
          <Button onClick={() => reject()}>Cancel</Button>
          <Button onClick={() => resolve()} color="indigo" variant="solid">OK</Button>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
}
```

Note: `react-dialog-hub/radix` is not yet released. Use custom components as shown above.

## TypeScript Type Reference

```typescript
import type {
  DialogBase,       // { resolve: (result: TResult) => void; reject: (reason?: TError) => void }
  DialogProps,      // TProps & DialogBase<TResult, TError>
  DialogComponent,  // (props: DialogProps<TProps, TResult, TError>) => React.ReactNode
  ShowFn,           // <TProps, TResult, TError>(comp, props?) => Promise<TResult>
  StackItem,        // internal stack structure (rarely needed)
} from 'react-dialog-hub';
```

Type defaults: `TResult = void`, `TError = unknown`

## Checklist for New Dialog Components

- Place `DialogsProvider` at the app root (once only)
- Import `DialogProps` from `react-dialog-hub` (not from subpaths)
- Define `TProps` and `TResult` as separate types before using `DialogProps<TProps, TResult>`
- For native `<dialog>`: add `useRef<HTMLDialogElement>` and `useEffect(() => ref.current?.showModal(), [])`
- For MUI: use `<Dialog open>` without ref or effect
- For Radix UI Themes: use `<Dialog.Root open>` without ref or effect
- Always call either `resolve()` or `reject()` on every exit path
- At the call site, wrap `await show(...)` in try/catch when using `reject()`
- The `show()` call must be inside an `async` function

## Docs and Examples

Full documentation: https://mohhh-ok.github.io/react-dialog-hub

# React Dialog Hub

Headless, type-safe dialog orchestration for React. Call dialogs like functions, keep your UI flexible, and reuse any dialog component you already have.

- **Headless**: bring your own UI (Plain, MUI, Radix, anything)
- **Function-based API**: `await show(MyDialog, props)`
- **Type-safe**: infers `props`, `resolve`, and `reject` types end-to-end
- **Minimal**: one provider, one hook, a few types

Read the full docs: https://mohhh-ok.github.io/react-dialog-hub

## Installation

```bash
pnpm add react-dialog-hub
# or
npm i react-dialog-hub
# or
yarn add react-dialog-hub
```

Peer dependency: React ^19.2.0

## Built-in Adapters

React Dialog Hub includes pre-built adapters for common use cases:

### Native Adapter (HTML Dialog)

```tsx
import { AlertDialog, ConfirmDialog, PromptDialog } from 'react-dialog-hub/native';

const { show } = useDialogs();
await show(AlertDialog, { content: 'Hello!' });
const ok = await show(ConfirmDialog, { content: 'Proceed?' });
const name = await show(PromptDialog, { content: 'Your name?', value: 'John' });
```

No additional dependencies required. Uses the native HTML `<dialog>` element.

### MUI Adapter (Material-UI)

```tsx
import { AlertDialog, ConfirmDialog, PromptDialog } from 'react-dialog-hub/mui';

const { show } = useDialogs();
await show(AlertDialog, { title: 'Notice', content: 'Done!' });
const ok = await show(ConfirmDialog, { title: 'Confirm', content: 'Delete?' });
```

Requires `@mui/material`, `@emotion/react`, and `@emotion/styled`.


## Quick Start

1) Wrap your app with the provider

```tsx
import { DialogProvider } from "react-dialog-hub";

export function AppRoot() {
  return (
    <DialogProvider>
      <App />
    </DialogProvider>
  );
}
```

2) Create a dialog component (any UI library is fine)

```tsx
import type { DialogProps } from "react-dialog-hub";

type ConfirmProps = { message: string };

export function ConfirmDialog({ message, resolve, reject }: DialogProps<ConfirmProps, boolean, void>) {
  return (
    <div role="dialog">
      <p>{message}</p>
      <button onClick={() => resolve(true)}>OK</button>
      <button onClick={() => resolve(false)}>Cancel</button>
    </div>
  );
}
```

3) Show it from anywhere

```tsx
import { useDialogs } from "react-dialog-hub";
import { ConfirmDialog } from "./ConfirmDialog";

export function DeleteButton() {
  const { show } = useDialogs();

  async function onClick() {
    const ok = await show(ConfirmDialog, { message: "Delete this item?" });
    if (ok) {
      // proceed
    }
  }

  return <button onClick={onClick}>Delete</button>;
}
```

## API

- `DialogProvider`: Wrap your app once.
- `useDialog()`: Returns `{ show }`.
- `show(Component, props?) => Promise<TResult>`: Pushes a dialog and resolves when it closes.
- Types: `DialogProps<TProps, TResult, TError>`, `DialogComponent`, `DialogBase`.

## Examples

- Native, MUI, Radix, and custom dialog examples: see docs — https://mohhh-ok.github.io/react-dialog-hub
- Use built-in adapters for quick setup, or create custom dialogs with any UI library

## Notes

- Works with any styling or component library.
- You control focus, animations, accessibility, and layout in your own dialog component.

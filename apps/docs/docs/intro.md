---
sidebar_position: 1
---

# React Dialog Hub

A headless, lightweight, and type-safe hub for orchestrating dialogs in React. Works with any UI library (MUI, Radix, or custom). Includes built-in adapters for quick setup.

## Features

- Trigger dialogs via function calls and await a Promise result
- UI-agnostic (headless): reuse your existing dialog components
- Type-safe props and results with TypeScript
- Built-in adapters for Native HTML dialogs and Material-UI

## Installation

```bash
pnpm add react-dialog-hub
```

### Optional: For MUI Adapter

```bash
pnpm add @mui/material @emotion/react @emotion/styled
```

## Built-in Adapters

Get started quickly with pre-built dialog components:

```tsx
import { Alert, Confirm, Prompt } from 'react-dialog-hub/native';
// or
import { Alert, Confirm, Prompt } from 'react-dialog-hub/mui';
// or
import { Alert, Confirm, Prompt } from 'react-dialog-hub/radix';

const { show } = useDialogs();
await show(Alert, { content: 'Hello!' });
const ok = await show(Confirm, { content: 'Proceed?' });
```

See the **Examples** section for detailed usage of each adapter.

## Quickstart (Custom Dialogs)

1. Place `DialogsProvider` at the app root
2. Call `show()` from `useDialogs()` to display any dialog component

```tsx
import { DialogsProvider, useDialogs } from 'react-dialog-hub';

function AppRoot() {
  return (
    <DialogsProvider>
      <App />
    </DialogsProvider>
  );
}

function Example() {
  const { show } = useDialogs();
  const onClick = async () => {
    const result = await show(MyConfirmDialog, { message: 'Proceed?' });
    console.log(result);
  };
  return <button onClick={onClick}>Open</button>;
}
```

See the guides in the left sidebar or the API reference for details.

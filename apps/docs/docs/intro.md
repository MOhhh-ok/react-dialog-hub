---
sidebar_position: 1
---

# React Dialog Hub

A headless, lightweight, and type-safe hub for orchestrating dialogs in React. Works with any UI library (MUI, Radix, or custom).

## Features

- Trigger dialogs via function calls and await a Promise result
- UI-agnostic (headless): reuse your existing dialog components
- Type-safe props and results with TypeScript

## Installation

```bash
pnpm add react-dialog-hub
```

## Quickstart

1. Place `DialogProvider` at the app root
2. Call `show()` from `useDialog()` to display any dialog component

```tsx
import { DialogProvider, useDialog } from 'react-dialog-hub';

function AppRoot() {
  return (
    <DialogProvider>
      <App />
    </DialogProvider>
  );
}

function Example() {
  const { show } = useDialog();
  const onClick = async () => {
    const result = await show(MyConfirmDialog, { message: 'Proceed?' });
    console.log(result);
  };
  return <button onClick={onClick}>Open</button>;
}
```

See the guides in the left sidebar or the API reference for details.

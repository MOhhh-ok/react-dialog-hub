# Getting Started

This guide covers the basic setup and usage of react-dialog-hub. The library includes built-in adapters for native HTML dialogs and Material-UI, or you can create custom dialogs for any UI framework. For the full API, see the "API" section in the sidebar.

## Installation

```bash
pnpm add react-dialog-hub
```

### Optional: Install UI Library

If you want to use the MUI adapter, install Material-UI:

```bash
pnpm add @mui/material @emotion/react @emotion/styled
```

The native adapter requires no additional dependencies (uses HTML `<dialog>` element).

## Place the Provider

At the root of your app, wrap with `DialogsProvider`.

```tsx
import { DialogsProvider } from 'react-dialog-hub';

export function Root() {
  return (
    <DialogsProvider>
      <App />
    </DialogsProvider>
  );
}
```

## Quick Start with Built-in Adapters

The easiest way to get started is using the built-in adapters:

### Native Adapter (HTML Dialog)

```tsx
import { useDialogs } from 'react-dialog-hub';
import { Alert, Confirm, Prompt } from 'react-dialog-hub/native';

function Page() {
  const { show } = useDialogs();

  const handleAlert = () => show(Alert, { content: 'Hello!' });
  const handleConfirm = async () => {
    const ok = await show(Confirm, { content: 'Proceed?' });
    console.log(ok ? 'Confirmed' : 'Cancelled');
  };
  const handlePrompt = async () => {
    const name = await show(Prompt, { content: 'Your name?', value: 'John' });
    if (name) console.log('Name:', name);
  };

  return (
    <div>
      <button onClick={handleAlert}>Alert</button>
      <button onClick={handleConfirm}>Confirm</button>
      <button onClick={handlePrompt}>Prompt</button>
    </div>
  );
}
```

### MUI Adapter

```tsx
import { useDialogs } from 'react-dialog-hub';
import { Alert, Confirm, Prompt } from 'react-dialog-hub/mui';

function Page() {
  const { show } = useDialogs();

  const handleAlert = () => show(Alert, { 
    title: 'Notice', 
    content: 'Operation completed!' 
  });
  
  const handleConfirm = async () => {
    const ok = await show(Confirm, { 
      title: 'Confirm', 
      content: 'Delete this item?' 
    });
    console.log(ok ? 'Deleted' : 'Cancelled');
  };

  return (
    <div>
      <button onClick={handleAlert}>Alert</button>
      <button onClick={handleConfirm}>Confirm</button>
    </div>
  );
}
```

## Create Custom Dialogs

Use `show()` from `useDialogs()` to display any dialog component. The component automatically receives `resolve` and `reject`. Calling `resolve(result)` resolves the Promise.

```tsx
import { useDialogs } from 'react-dialog-hub';

function Page() {
  const { show } = useDialogs();
  const openConfirm = async () => {
    const ok = await show(ConfirmDialog, { message: 'Proceed?' });
    if (ok) {
      // do something
    }
  };
  return <button onClick={openConfirm}>Open Confirm</button>;
}
```

### Confirm Example (vanilla)

```tsx
type ConfirmProps = { message: string };
type ConfirmResult = boolean;

function ConfirmDialog({ message, resolve, reject }: DialogProps<ConfirmProps, ConfirmResult>) {
  return (
    <div role="dialog">
      <p>{message}</p>
      <button onClick={() => resolve(true)}>OK</button>
      <button onClick={() => resolve(false)}>Cancel</button>
    </div>
  );
}
```

For UI libraries like Radix, pass through `resolve/reject` to your existing dialog component and call them accordingly.

---

## Next Steps

- Check the **Examples** section for more use cases (Plain, Native, Radix, MUI, MUI Adapter)
- See the **API** section for complete type definitions and advanced usage



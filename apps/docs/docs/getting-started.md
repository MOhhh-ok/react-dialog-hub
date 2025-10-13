# Getting Started

This guide covers the basic setup and examples for Radix, MUI, and vanilla dialogs. For the full API, see the "API" section in the sidebar.

## Installation

```bash
pnpm add react-dialog-hub
```

## Place the Provider

At the root of your app, wrap with `DialogProvider`.

```tsx
import { DialogProvider } from 'react-dialog-hub';

export function Root() {
  return (
    <DialogProvider>
      <App />
    </DialogProvider>
  );
}
```

## Invoke a Dialog

Use `show()` from `useDialog()` to display any dialog component. The component automatically receives `resolve` and `reject`. Calling `resolve(result)` resolves the Promise.

```tsx
import { useDialog } from 'react-dialog-hub';

function Page() {
  const { show } = useDialog();
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

For UI libraries like Radix and MUI, pass through `resolve/reject` to your existing dialog component and call them accordingly.

---

Next, check the API section for details.



---
title: Native
description: Built-in adapter using HTMLDialogElement
---

The native adapter provides pre-built dialog components using the HTML `<dialog>` element. These components are included in the `react-dialog-hub` package and can be imported directly.

## Installation

No additional installation required - the native adapter is included with `react-dialog-hub`.

## Import

```tsx
import { AlertDialog, ConfirmDialog, PromptDialog } from 'react-dialog-hub/native';
```

## Components

### AlertDialog

A simple alert dialog with a single OK button.

```tsx
import { useDialogs } from 'react-dialog-hub';
import { AlertDialog } from 'react-dialog-hub/native';

function MyComponent() {
  const { show } = useDialogs();

  const handleClick = async () => {
    await show(AlertDialog, {
      content: 'This is an alert message!',
      className: 'my-dialog-class'
    });
  };

  return <button onClick={handleClick}>Show Alert</button>;
}
```

**Props:**
- `content: ReactNode` - The content to display in the alert
- `className?: string` - Optional CSS class for the dialog element

### ConfirmDialog

A confirmation dialog with Cancel and OK buttons. Returns `true` or `false`.

```tsx
import { useDialogs } from 'react-dialog-hub';
import { ConfirmDialog } from 'react-dialog-hub/native';

function MyComponent() {
  const { show } = useDialogs();

  const handleClick = async () => {
    const confirmed = await show(ConfirmDialog, {
      content: 'Are you sure you want to proceed?',
      className: 'my-dialog-class'
    });

    if (confirmed) {
      // User clicked OK
    } else {
      // User clicked Cancel
    }
  };

  return <button onClick={handleClick}>Show Confirm</button>;
}
```

**Props:**
- `content: ReactNode` - The content to display in the confirmation dialog
- `className?: string` - Optional CSS class for the dialog element

**Returns:** `boolean` - `true` if OK is clicked, `false` if Cancel is clicked

### PromptDialog

A prompt dialog with an input field, Cancel and OK buttons. Returns the input value or `undefined`.

```tsx
import { useDialogs } from 'react-dialog-hub';
import { PromptDialog } from 'react-dialog-hub/native';

function MyComponent() {
  const { show } = useDialogs();

  const handleClick = async () => {
    const result = await show(PromptDialog, {
      content: 'What is your name?',
      value: 'Default Name'
    });

    if (result !== undefined) {
      console.log('User entered:', result);
    } else {
      console.log('User cancelled');
    }
  };

  return <button onClick={handleClick}>Show Prompt</button>;
}
```

**Props:**
- `content: ReactNode` - The content to display above the input field
- `value?: string` - Optional default value for the input field

**Returns:** `string | undefined` - The input value if OK is clicked, `undefined` if Cancel is clicked

## Styling

The native adapter uses the HTML `<dialog>` element, which can be styled with CSS. You can add a `className` prop to apply custom styles:

```css
.my-dialog-class {
  border-radius: 8px;
  padding: 20px;
  border: 1px solid #ccc;
}

.my-dialog-class::backdrop {
  background: rgba(0, 0, 0, 0.5);
}
```

## Browser Support

The native adapter uses the `<dialog>` element, which is supported in modern browsers. For older browsers, you may need a polyfill or consider using the MUI or Radix adapters instead.
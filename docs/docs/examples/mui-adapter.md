---
title: MUI Adapter
description: Built-in adapter using Material-UI components
---

The MUI adapter provides pre-built dialog components using Material-UI (MUI). These components are included in the `react-dialog-hub` package and can be imported directly.

## Installation

Install Material-UI if you haven't already:

```bash
npm install @mui/material @emotion/react @emotion/styled
```

## Import

```tsx
import { Alert, Confirm, Prompt } from 'react-dialog-hub/mui';
```

## Components

### Alert

A simple alert dialog with a single OK button, using MUI's Dialog component.

```tsx
import { useDialogs } from 'react-dialog-hub';
import { Alert } from 'react-dialog-hub/mui';

function MyComponent() {
  const { show } = useDialogs();

  const handleClick = async () => {
    await show(Alert, {
      title: 'Alert',
      content: 'This is an alert message!'
    });
  };

  return <button onClick={handleClick}>Show Alert</button>;
}
```

**Props:**
- `title?: ReactNode` - Optional title for the dialog
- `content?: ReactNode` - The content to display in the dialog body

### Confirm

A confirmation dialog with Cancel and OK buttons. Returns `true` or `false`.

```tsx
import { useDialogs } from 'react-dialog-hub';
import { Confirm } from 'react-dialog-hub/mui';

function MyComponent() {
  const { show } = useDialogs();

  const handleClick = async () => {
    const confirmed = await show(Confirm, {
      title: 'Confirm Action',
      content: 'Are you sure you want to proceed?'
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
- `title?: ReactNode` - Optional title for the dialog
- `content?: ReactNode` - The content to display in the dialog body

**Returns:** `boolean` - `true` if OK is clicked, `false` if Cancel is clicked

### Prompt

A prompt dialog with an input field, Cancel and OK buttons. Returns the input value or `undefined`.

```tsx
import { useDialogs } from 'react-dialog-hub';
import { Prompt } from 'react-dialog-hub/mui';

function MyComponent() {
  const { show } = useDialogs();

  const handleClick = async () => {
    const result = await show(Prompt, {
      title: 'Enter Your Name',
      content: 'Please provide your name:',
      value: 'John Doe'
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
- `title?: ReactNode` - Optional title for the dialog
- `content?: ReactNode` - The content to display above the input field
- `value?: string` - Optional default value for the input field

**Returns:** `string | undefined` - The input value if OK is clicked, `undefined` if Cancel is clicked

## Styling

The MUI adapter uses Material-UI's theming system. You can customize the appearance by wrapping your app with MUI's `ThemeProvider`:

```tsx
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { DialogsProvider } from 'react-dialog-hub';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <DialogsProvider>
        {/* Your app content */}
      </DialogsProvider>
    </ThemeProvider>
  );
}
```

## Features

- Full Material Design styling
- Consistent with MUI components
- Responsive by default
- Accessible (ARIA compliant)
- Smooth animations
- Theme integration

## Dependencies

Requires `@mui/material`, `@emotion/react`, and `@emotion/styled` to be installed in your project.
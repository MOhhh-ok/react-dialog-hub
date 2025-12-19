---
title: MUI
description: Implementation examples using MUI (Material UI)
---

Examples:

- Alert
- Confirm
- Prompt
- SelectSingle
- SelectMulti
- Progress

### Alert

```tsx title="apps/example/src/dialogs/mui/Alert.tsx"
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useDialogs, type DialogProps } from "react-dialog-hub";

export function Alert(props: DialogProps<{ message: string }>) {
  const { resolve, message } = props;

  return <Dialog open>
    <DialogTitle>Alert</DialogTitle>
    <DialogContent>{message}</DialogContent>
    <DialogActions>
      <Button onClick={resolve} variant="contained" color="primary">OK</Button>
    </DialogActions>
  </Dialog>
}

export function AlertTrigger() {
  const { show } = useDialogs();
  return <button onClick={() => show(Alert, { message: 'Hello World!' })}>Alert</button>;
}
```

### Confirm

```tsx title="apps/example/src/dialogs/mui/Confirm.tsx"
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useDialogs, type DialogProps } from "react-dialog-hub";

export function Confirm(props: DialogProps<{ message: string }>) {
  const { resolve, reject, message } = props;

  return <Dialog open>
    <DialogTitle>Confirm</DialogTitle>
    <DialogContent>{message}</DialogContent>
    <DialogActions>
      <Button onClick={reject}>Cancel</Button>
      <Button onClick={resolve} variant="contained" color="primary">OK</Button>
    </DialogActions>
  </Dialog>;
}

export function ConfirmTrigger() {
  const { show } = useDialogs();

  const handleClick = async () => {
    try {
      await show(Confirm, { message: 'Hello World!' });
      alert('OK');
    } catch (err) {
      alert('Cancel');
    }
  };

  return <button onClick={handleClick}>Confirm</button>;
}
```

### Prompt

```tsx title="apps/example/src/dialogs/mui/Prompt.tsx"
import { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useDialogs, type DialogProps } from "react-dialog-hub";

export type PromptProps = {
  message: string;
  defaultValue?: string;
}

export function Prompt(props: DialogProps<PromptProps, string>) {
  const { resolve, reject, message } = props;
  const [value, setValue] = useState(props.defaultValue ?? '');

  return <Dialog open>
    <DialogTitle>Prompt</DialogTitle>
    <DialogContent>
      <div style={{ marginBottom: 12 }}>{message}</div>
      <TextField autoFocus fullWidth value={value} onChange={(e) => setValue(e.target.value)} />
    </DialogContent>
    <DialogActions>
      <Button onClick={reject}>Cancel</Button>
      <Button onClick={() => resolve(value)} variant="contained" color="primary">OK</Button>
    </DialogActions>
  </Dialog>;
}

export function PromptTrigger() {
  const { show } = useDialogs();

  const handleClick = async () => {
    try {
      const value = await show(Prompt, {
        message: 'Input your name',
        defaultValue: 'Taro'
      });
      alert(`OK: ${value}`);
    } catch (err) {
      alert('Cancel');
    }
  };

  return <button onClick={handleClick}>Prompt</button>;
}
```

### SelectSingle

```tsx title="apps/example/src/dialogs/mui/SelectSingle.tsx"
import { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { useDialogs, type DialogProps } from "react-dialog-hub";

export type SelectSingleProps = {
  title: string;
  options: string[];
  defaultValue?: string;
}

export function SelectSingle(
  props: DialogProps<SelectSingleProps, string>,
) {
  const { resolve, reject, title, options } = props;
  const [value, setValue] = useState(props.defaultValue ?? options[0] ?? "");

  return <Dialog open>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>
      <FormControl>
        <RadioGroup value={value} onChange={(e) => setValue(e.target.value)}>
          {options.map(option => (
            <FormControlLabel key={option} value={option} control={<Radio />} label={option} />
          ))}
        </RadioGroup>
      </FormControl>
    </DialogContent>
    <DialogActions>
      <Button onClick={reject}>Cancel</Button>
      <Button onClick={() => resolve(value)} variant="contained" color="primary">OK</Button>
    </DialogActions>
  </Dialog>;
}

export function SelectSingleTrigger() {
  const { show } = useDialogs();

  const handleClick = async () => {
    try {
      const value = await show(SelectSingle, {
        title: 'Select one fruit',
        options: ['Apple', 'Banana', 'Cherry'],
        defaultValue: 'Banana'
      });
      alert(`OK: ${value}`);
    } catch (err) {
      alert('Cancel');
    }
  };

  return <button onClick={handleClick}>Select Single</button>;
}
```

### SelectMulti

```tsx title="apps/example/src/dialogs/mui/SelectMulti.tsx"
import { useState } from "react";
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, FormGroup } from "@mui/material";
import { useDialogs, type DialogProps } from "react-dialog-hub";

export type SelectMultiProps = {
  title: string;
  options: string[];
  defaultValues?: string[];
}

export function SelectMulti(
  props: DialogProps<SelectMultiProps, string[]>
) {
  const { resolve, reject, title, options } = props;
  const [values, setValues] = useState<string[]>(props.defaultValues ?? []);

  const toggle = (option: string) => {
    setValues(prev => prev.includes(option)
      ? prev.filter(v => v !== option)
      : [...prev, option]
    );
  };

  return <Dialog open>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>
      <FormGroup>
        {options.map(option => {
          const checked = values.includes(option);
          return (
            <FormControlLabel
              key={option}
              control={<Checkbox checked={checked} onChange={() => toggle(option)} />}
              label={option}
            />
          );
        })}
      </FormGroup>
    </DialogContent>
    <DialogActions>
      <Button onClick={reject}>Cancel</Button>
      <Button onClick={() => resolve(values)} variant="contained" color="primary">OK</Button>
    </DialogActions>
  </Dialog>;
}

export function SelectMultiTrigger() {
  const { show } = useDialogs();

  const handleClick = async () => {
    try {
      const selected = await show(SelectMulti, {
        title: 'Select multiple fruits',
        options: ['Apple', 'Banana', 'Cherry', 'Dates'],
        defaultValues: ['Apple', 'Cherry']
      });
      alert(`OK: ${selected.join(', ')}`);
    } catch (err) {
      alert('Cancel');
    }
  };

  return <button onClick={handleClick}>Select Multi</button>;
}
```

### Progress

```tsx title="apps/example/src/dialogs/mui/Progress.tsx"
import { useEffect, useRef, useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, LinearProgress, Typography } from "@mui/material";
import { useDialogs, type DialogProps } from "react-dialog-hub";

const TICK_MS = 50;

export type ProgressProps = {
  title?: string;
  durationMs?: number;
  cancellable?: boolean;
}

export function Progress(
  props: DialogProps<ProgressProps, void, string>
) {
  const { resolve, reject, title } = props;
  const durationMs = props.durationMs ?? 2000;
  const cancellable = props.cancellable ?? true;
  const [value, setValue] = useState(0);
  const abortedRef = useRef(false);

  useEffect(() => {
    const start = Date.now();
    const id = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min(100, Math.floor((elapsed / durationMs) * 100));
      setValue(pct);
      if (pct >= 100) {
        clearInterval(id);
        if (!abortedRef.current) {
          resolve();
        }
      }
    }, TICK_MS);

    return () => clearInterval(id);
  }, [durationMs, resolve]);

  const handleCancel = () => {
    abortedRef.current = true;
    reject("cancelled");
  };

  return <Dialog open>
    <DialogTitle>{title ?? 'Processing...'}</DialogTitle>
    <DialogContent>
      <LinearProgress variant="determinate" value={value} />
      <Typography sx={{ mt: 1 }}>{value}%</Typography>
    </DialogContent>
    {cancellable && (
      <DialogActions>
        <Button onClick={handleCancel}>Cancel</Button>
      </DialogActions>
    )}
  </Dialog>;
}

export function ProgressTrigger() {
  const { show } = useDialogs();

  const handleClick = async () => {
    try {
      await show(Progress, { title: 'Loading...', durationMs: 1500, cancellable: true });
      alert('Done');
    } catch (err) {
      alert('Cancelled');
    }
  };

  return <button onClick={handleClick}>Progress</button>;
}
```



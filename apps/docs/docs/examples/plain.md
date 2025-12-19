---
title: Plain
description: Simple implementation using the built-in HTMLDialogElement
---

Examples:

- Alert
- Confirm
- Prompt
- SelectSingle
- SelectMulti
- Progress

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

### Alert

```tsx title="apps/example/src/dialogs/plain/Alert.tsx"
import { useEffect, useRef } from "react";
import { useDialogs, type DialogProps } from "react-dialog-hub";

export function Alert(props: DialogProps<{ message: string }>) {
  const { resolve, message } = props;
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => ref.current?.showModal(), []);

  return <dialog ref={ref} >
    <p>{message}</p>
    <button onClick={resolve}>OK</button>
  </dialog>
}

export function AlertTrigger() {
  const { show } = useDialogs();
  return <button onClick={() => show(Alert, { message: 'Hello World!' })}>Alert</button>
}
```

### Confirm

```tsx title="apps/example/src/dialogs/plain/Confirm.tsx"
import { useEffect, useRef } from "react";
import { useDialogs, type DialogProps } from "react-dialog-hub";

export function Confirm(props: DialogProps<{ message: string }>) {
  const { resolve, reject, message } = props;
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => ref.current?.showModal(), []);

  return <dialog ref={ref} >
    <p>{message}</p>
    <button onClick={reject}>Cancel</button>
    <button onClick={resolve}>OK</button>
  </dialog>
}

export function ConfirmTrigger() {
  const { show } = useDialogs();

  const handleClick = async () => {
    try {
      await show(Confirm, { message: 'Hello World!' })
      alert('OK');
    } catch (err) {
      alert('Cancel');
    }
  }
  return <button onClick={handleClick}>Confirm</button>
}
```

### Prompt

```tsx title="apps/example/src/dialogs/plain/Prompt.tsx"
import { useEffect, useRef, useState } from "react";
import { useDialogs, type DialogProps } from "react-dialog-hub";

export type PromptProps = {
  message: string;
  defaultValue?: string;
}

export function Prompt(props: DialogProps<PromptProps, string>) {
  const { resolve, reject, message } = props;
  const [value, setValue] = useState(props.defaultValue ?? '');
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => ref.current?.showModal(), []);

  return <dialog ref={ref} >
    <p>{message}</p>
    <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
    <button onClick={reject}>Cancel</button>
    <button onClick={() => resolve(value)}>OK</button>
  </dialog>
}

export function PromptTrigger() {
  const { show } = useDialogs();

  const handleClick = async () => {
    try {
      const value = await show(Prompt, {
        message: 'Input your name',
        defaultValue: 'Taro'
      })
      alert(`OK: ${value}`);
    } catch (err) {
      alert('Cancel');
    }
  }
  return <button onClick={handleClick}>Prompt</button>
}
```

### SelectSingle

```tsx title="apps/example/src/dialogs/plain/SelectSingle.tsx"
import { useEffect, useRef, useState } from "react";
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
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => ref.current?.showModal(), []);

  return <dialog ref={ref} >
    <p>{title}</p>
    <ul>
      {options.map(option => (
        <li key={option}>
          <label>
            <input
              type="radio"
              checked={value === option}
              onChange={() => setValue(option)}
            />
            {option}
          </label>
        </li>
      ))}
    </ul>
    <button onClick={reject}>Cancel</button>
    <button onClick={() => resolve(value)}>OK</button>
  </dialog>
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

```tsx title="apps/example/src/dialogs/plain/SelectMulti.tsx"
import { useEffect, useRef, useState } from "react";
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
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => ref.current?.showModal(), []);

  const toggle = (option: string) => {
    setValues(prev => prev.includes(option)
      ? prev.filter(v => v !== option)
      : [...prev, option]
    );
  };

  return <dialog ref={ref} >
    <p>{title}</p>
    <ul>
      {options.map(option => {
        const checked = values.includes(option);
        return (
          <li key={option}>
            <label>
              <input
                type="checkbox"
                checked={checked}
                onChange={() => toggle(option)}
              />
              {option}
            </label>
          </li>
        );
      })}
    </ul>
    <button onClick={reject}>Cancel</button>
    <button onClick={() => resolve(values)}>OK</button>
  </dialog>
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

```tsx title="apps/example/src/dialogs/plain/Progress.tsx"
import { useEffect, useRef, useState } from "react";
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
  const dialogRef = useRef<HTMLDialogElement>(null);
  const abortedRef = useRef(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    dialog?.showModal();

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

  return <dialog ref={dialogRef} >
    <p>{title ?? 'Processing...'}</p>
    <progress value={value} max={100} />
    <p>{value}%</p>
    {cancellable && <button onClick={handleCancel}>Cancel</button>}
  </dialog>
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



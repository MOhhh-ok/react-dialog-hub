---
title: Radix
description: Implementation examples using Radix UI Themes
---

Examples:

- Alert
- Confirm
- Prompt
- SelectSingle
- SelectMulti
- Progress

### Alert

```tsx title="apps/example/src/dialogs/radix/Alert.tsx"
import { Button, Dialog } from "@radix-ui/themes";
import { useDialogs, type DialogProps } from "react-dialog-hub";

export function Alert(props: DialogProps<{ message: string }>) {
  const { resolve, message } = props;
  const { Root, Content, Title, Description } = Dialog

  return <>
    <Root open>
      <Content>
        <Title>Alert</Title>
        <Description>{message}</Description>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 12 }}>
          <Button onClick={resolve}>OK</Button>
        </div>
      </Content>
    </Root>
  </>
}

export function AlertTrigger() {
  const { show } = useDialogs();
  return <button onClick={() => show(Alert, { message: 'Hello World!' })}>Alert</button>
}
```

### Confirm

```tsx title="apps/example/src/dialogs/radix/Confirm.tsx"
import { Button, Dialog } from "@radix-ui/themes";
import { useDialogs, type DialogProps } from "react-dialog-hub";

export function Confirm(props: DialogProps<{ message: string }>) {
  const { resolve, reject, message } = props;
  const { Root, Content, Title, Description } = Dialog;

  return <Root open>
    <Content>
      <Title>Confirm</Title>
      <Description>{message}</Description>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 12 }}>
        <Button onClick={reject}>Cancel</Button>
        <Button onClick={resolve} color="indigo" variant="solid">OK</Button>
      </div>
    </Content>
  </Root>;
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

```tsx title="apps/example/src/dialogs/radix/Prompt.tsx"
import { useState } from "react";
import { Button, Dialog } from "@radix-ui/themes";
import { useDialogs, type DialogProps } from "react-dialog-hub";

export type PromptProps = {
  message: string;
  defaultValue?: string;
}

export function Prompt(props: DialogProps<PromptProps, string>) {
  const { resolve, reject, message } = props;
  const [value, setValue] = useState(props.defaultValue ?? '');
  const { Root, Content, Title, Description } = Dialog;

  return <Root open>
    <Content>
      <Title>Prompt</Title>
      <Description>{message}</Description>
      <input
        autoFocus
        style={{ width: '100%', marginTop: 12, padding: 8 }}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 12 }}>
        <Button onClick={reject}>Cancel</Button>
        <Button onClick={() => resolve(value)} color="indigo" variant="solid">OK</Button>
      </div>
    </Content>
  </Root>;
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

```tsx title="apps/example/src/dialogs/radix/SelectSingle.tsx"
import { useState } from "react";
import { Button, Dialog } from "@radix-ui/themes";
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
  const { Root, Content, Title } = Dialog;

  return <Root open>
    <Content>
      <Title>{title}</Title>
      <ul style={{ marginTop: 12 }}>
        {options.map(option => (
          <li key={option} style={{ listStyle: 'none', marginBottom: 6 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
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
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 12 }}>
        <Button onClick={reject}>Cancel</Button>
        <Button onClick={() => resolve(value)} color="indigo" variant="solid">OK</Button>
      </div>
    </Content>
  </Root>;
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

```tsx title="apps/example/src/dialogs/radix/SelectMulti.tsx"
import { useState } from "react";
import { Button, Dialog } from "@radix-ui/themes";
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
  const { Root, Content, Title } = Dialog;

  const toggle = (option: string) => {
    setValues(prev => prev.includes(option)
      ? prev.filter(v => v !== option)
      : [...prev, option]
    );
  };

  return <Root open>
    <Content>
      <Title>{title}</Title>
      <ul style={{ marginTop: 12 }}>
        {options.map(option => {
          const checked = values.includes(option);
          return (
            <li key={option} style={{ listStyle: 'none', marginBottom: 6 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
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
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 12 }}>
        <Button onClick={reject}>Cancel</Button>
        <Button onClick={() => resolve(values)} color="indigo" variant="solid">OK</Button>
      </div>
    </Content>
  </Root>;
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

```tsx title="apps/example/src/dialogs/radix/Progress.tsx"
import { useEffect, useRef, useState } from "react";
import { Button, Dialog } from "@radix-ui/themes";
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
  const { Root, Content, Title } = Dialog;

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

  return <Root open>
    <Content>
      <Title>{title ?? 'Processing...'}</Title>
      <div style={{ marginTop: 12 }}>
        <div style={{ height: 8, background: '#eee', borderRadius: 999 }}>
          <div style={{ height: 8, width: `${value}%`, background: 'var(--accent-9)', borderRadius: 999 }} />
        </div>
        <div style={{ marginTop: 8, textAlign: 'right' }}>{value}%</div>
      </div>
      {cancellable && (
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 12 }}>
          <Button onClick={handleCancel}>Cancel</Button>
        </div>
      )}
    </Content>
  </Root>;
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



import { useEffect, useRef, useState } from "react";
import { Button, Dialog } from "@radix-ui/themes";
import { useDialog, type DialogProps } from "react-dialog-hub";

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
  const { show } = useDialog();

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



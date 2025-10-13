import { useEffect, useRef, useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, LinearProgress, Typography } from "@mui/material";
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



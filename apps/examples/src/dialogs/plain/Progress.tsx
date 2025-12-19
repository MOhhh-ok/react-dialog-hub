import { useEffect, useRef, useState } from "react";
import { type DialogProps, useDialogs } from "react-dialog-hub";

const TICK_MS = 50;

export type ProgressProps = {
  title?: string;
  durationMs?: number;
  cancellable?: boolean;
};

export function Progress(
  props: DialogProps<ProgressProps, void, string>,
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

  return (
    <dialog ref={dialogRef}>
      <p>{title ?? "Processing..."}</p>
      <progress value={value} max={100} />
      <p>{value}%</p>
      {cancellable && <button onClick={handleCancel}>Cancel</button>}
    </dialog>
  );
}

export function ProgressTrigger() {
  const { show } = useDialogs();

  const handleClick = async () => {
    try {
      await show(Progress, { title: "Loading...", durationMs: 1500, cancellable: true });
      alert("Done");
    } catch (err) {
      alert("Cancelled");
    }
  };

  return <button onClick={handleClick}>Progress</button>;
}

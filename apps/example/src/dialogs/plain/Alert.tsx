import { useEffect, useRef } from "react";
import { type DialogProps, useDialog } from "react-dialog-hub";

export function Alert(props: DialogProps<{ message: string }>) {
  const { resolve, message } = props;
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => ref.current?.showModal(), []);

  return (
    <dialog ref={ref}>
      <p>{message}</p>
      <button onClick={() => resolve()}>OK</button>
    </dialog>
  );
}

export function AlertTrigger() {
  const { show } = useDialog();
  return <button onClick={() => show(Alert, { message: "Hello World!" })}>Alert</button>;
}

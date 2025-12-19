import { useEffect, useRef } from "react";
import { type DialogProps, useDialogs } from "react-dialog-hub";

export function Confirm(props: DialogProps<{ message: string }>) {
  const { resolve, reject, message } = props;
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => ref.current?.showModal(), []);

  return (
    <dialog ref={ref}>
      <p>{message}</p>
      <button onClick={reject}>Cancel</button>
      <button onClick={() => resolve()}>OK</button>
    </dialog>
  );
}

export function ConfirmTrigger() {
  const { show } = useDialogs();

  const handleClick = async () => {
    try {
      await show(Confirm, { message: "Hello World!" });
      alert("OK");
    } catch (err) {
      alert("Cancel");
    }
  };
  return <button onClick={handleClick}>Confirm</button>;
}

import { useEffect, useRef, useState } from "react";
import { type DialogProps, useDialogs } from "react-dialog-hub";

export type PromptProps = {
  message: string;
  defaultValue?: string;
};

export function Prompt(props: DialogProps<PromptProps, string>) {
  const { resolve, reject, message } = props;
  const [value, setValue] = useState(props.defaultValue ?? "");
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => ref.current?.showModal(), []);

  return (
    <dialog ref={ref}>
      <p>{message}</p>
      <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
      <button onClick={reject}>Cancel</button>
      <button onClick={() => resolve(value)}>OK</button>
    </dialog>
  );
}

export function PromptTrigger() {
  const { show } = useDialogs();

  const handleClick = async () => {
    try {
      const value = await show(Prompt, {
        message: "Input your name",
        defaultValue: "Taro",
      });
      alert(`OK: ${value}`);
    } catch (err) {
      alert("Cancel");
    }
  };
  return <button onClick={handleClick}>Prompt</button>;
}

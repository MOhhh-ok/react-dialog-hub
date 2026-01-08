import { useEffect, useRef, useState } from "react";
import { type DialogProps, useDialogs } from "react-dialog-hub";

export type SelectSingleProps = {
  title: string;
  options: string[];
  defaultValue?: string;
};

export function SelectSingle(
  props: DialogProps<SelectSingleProps, string>,
) {
  const { resolve, reject, title, options } = props;
  const [value, setValue] = useState(props.defaultValue ?? options[0] ?? "");
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => ref.current?.showModal(), []);

  return (
    <dialog ref={ref}>
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
  );
}

export function SelectSingleTrigger() {
  const { show } = useDialogs();

  const handleClick = async () => {
    try {
      const value = await show(SelectSingle, {
        title: "Select one fruit",
        options: ["Apple", "Banana", "Cherry"],
        defaultValue: "Banana",
      });
      alert(`OK: ${value}`);
    } catch (err) {
      alert("Cancel");
    }
  };

  return <button onClick={handleClick}>Select Single</button>;
}

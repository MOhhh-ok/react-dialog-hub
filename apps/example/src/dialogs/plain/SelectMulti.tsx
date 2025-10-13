import { useEffect, useRef, useState } from "react";
import { useDialog, type DialogProps } from "react-dialog-hub";

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
  const { show } = useDialog();

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



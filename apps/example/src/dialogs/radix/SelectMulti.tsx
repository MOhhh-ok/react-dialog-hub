import { useState } from "react";
import { Button, Dialog } from "@radix-ui/themes";
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



import { Button, Dialog } from "@radix-ui/themes";
import { useState } from "react";
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
  const { Root, Content, Title } = Dialog;

  return (
    <Root open>
      <Content>
        <Title>{title}</Title>
        <ul style={{ marginTop: 12 }}>
          {options.map(option => (
            <li key={option} style={{ listStyle: "none", marginBottom: 6 }}>
              <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
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
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 12 }}>
          <Button onClick={reject}>Cancel</Button>
          <Button onClick={() => resolve(value)} color="indigo" variant="solid">OK</Button>
        </div>
      </Content>
    </Root>
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

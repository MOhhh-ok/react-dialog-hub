import { Button, Dialog } from "@radix-ui/themes";
import { useState } from "react";
import { type DialogProps, useDialogs } from "react-dialog-hub";

export type PromptProps = {
  message: string;
  defaultValue?: string;
};

export function Prompt(props: DialogProps<PromptProps, string>) {
  const { resolve, reject, message } = props;
  const [value, setValue] = useState(props.defaultValue ?? "");
  const { Root, Content, Title, Description } = Dialog;

  return (
    <Root open>
      <Content>
        <Title>Prompt</Title>
        <Description>{message}</Description>
        <input
          autoFocus
          style={{ width: "100%", marginTop: 12, padding: 8 }}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 12 }}>
          <Button onClick={reject}>Cancel</Button>
          <Button onClick={() => resolve(value)} color="indigo" variant="solid">OK</Button>
        </div>
      </Content>
    </Root>
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

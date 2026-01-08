import { Button, Dialog } from "@radix-ui/themes";
import { type DialogProps, useDialogs } from "react-dialog-hub";

export function Confirm(props: DialogProps<{ message: string }>) {
  const { resolve, reject, message } = props;
  const { Root, Content, Title, Description } = Dialog;

  return (
    <Root open>
      <Content>
        <Title>Confirm</Title>
        <Description>{message}</Description>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 12 }}>
          <Button onClick={reject}>Cancel</Button>
          <Button onClick={() => resolve()} color="indigo" variant="solid">OK</Button>
        </div>
      </Content>
    </Root>
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

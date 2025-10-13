import { Button, Dialog } from "@radix-ui/themes";
import { useDialog, type DialogProps } from "react-dialog-hub";


export function Alert(props: DialogProps<{ message: string }>) {
  const { resolve, message } = props;
  const { Root, Content, Title, Description } = Dialog

  return <>
    <Root open>
      <Content>
        <Title>Alert</Title>
        <Description>{message}</Description>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 12 }}>
          <Button onClick={resolve}>OK</Button>
        </div>
      </Content>
    </Root>
  </>
}

export function AlertTrigger() {
  const { show } = useDialog();
  return <button onClick={() => show(Alert, { message: 'Hello World!' })}>Alert</button>
}


import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { type DialogProps, useDialogs } from "react-dialog-hub";

export function Alert(props: DialogProps<{ message: string }>) {
  const { resolve, message } = props;

  return (
    <Dialog open>
      <DialogTitle>Alert</DialogTitle>
      <DialogContent>{message}</DialogContent>
      <DialogActions>
        <Button onClick={() => resolve()} variant="contained" color="primary">OK</Button>
      </DialogActions>
    </Dialog>
  );
}

export function AlertTrigger() {
  const { show } = useDialogs();
  return <button onClick={() => show(Alert, { message: "Hello World!" })}>Alert</button>;
}

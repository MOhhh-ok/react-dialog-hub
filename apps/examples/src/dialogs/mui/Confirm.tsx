import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { type DialogProps, useDialogs } from "react-dialog-hub";

export function Confirm(props: DialogProps<{ message: string }>) {
  const { resolve, reject, message } = props;

  return (
    <Dialog open>
      <DialogTitle>Confirm</DialogTitle>
      <DialogContent>{message}</DialogContent>
      <DialogActions>
        <Button onClick={reject}>Cancel</Button>
        <Button onClick={() => resolve()} variant="contained" color="primary">OK</Button>
      </DialogActions>
    </Dialog>
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

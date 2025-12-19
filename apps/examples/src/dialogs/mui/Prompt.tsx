import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";
import { type DialogProps, useDialogs } from "react-dialog-hub";

export type PromptProps = {
  message: string;
  defaultValue?: string;
};

export function Prompt(props: DialogProps<PromptProps, string>) {
  const { resolve, reject, message } = props;
  const [value, setValue] = useState(props.defaultValue ?? "");

  return (
    <Dialog open>
      <DialogTitle>Prompt</DialogTitle>
      <DialogContent>
        <div style={{ marginBottom: 12 }}>{message}</div>
        <TextField autoFocus fullWidth value={value} onChange={(e) => setValue(e.target.value)} />
      </DialogContent>
      <DialogActions>
        <Button onClick={reject}>Cancel</Button>
        <Button onClick={() => resolve(value)} variant="contained" color="primary">OK</Button>
      </DialogActions>
    </Dialog>
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

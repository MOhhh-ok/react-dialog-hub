import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
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

  return (
    <Dialog open>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <FormControl>
          <RadioGroup value={value} onChange={(e) => setValue(e.target.value)}>
            {options.map(option => <FormControlLabel key={option} value={option} control={<Radio />} label={option} />)}
          </RadioGroup>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={reject}>Cancel</Button>
        <Button onClick={() => resolve(value)} variant="contained" color="primary">OK</Button>
      </DialogActions>
    </Dialog>
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

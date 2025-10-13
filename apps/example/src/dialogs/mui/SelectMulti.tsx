import { useState } from "react";
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, FormGroup } from "@mui/material";
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

  const toggle = (option: string) => {
    setValues(prev => prev.includes(option)
      ? prev.filter(v => v !== option)
      : [...prev, option]
    );
  };

  return <Dialog open>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>
      <FormGroup>
        {options.map(option => {
          const checked = values.includes(option);
          return (
            <FormControlLabel
              key={option}
              control={<Checkbox checked={checked} onChange={() => toggle(option)} />}
              label={option}
            />
          );
        })}
      </FormGroup>
    </DialogContent>
    <DialogActions>
      <Button onClick={reject}>Cancel</Button>
      <Button onClick={() => resolve(values)} variant="contained" color="primary">OK</Button>
    </DialogActions>
  </Dialog>;
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



import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { type ReactNode, useState } from "react";
import { type DialogProps } from "react-dialog-hub";

type Input = { title?: ReactNode; content?: ReactNode; value?: string };
type Output = string | undefined;
export type PromptProps = DialogProps<Input, Output>;

export function PromptDialog({ title, content, value, resolve }: PromptProps) {
  const [draft, setDraft] = useState(value);

  return (
    <Dialog open>
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent>
        {content}
        <TextField autoFocus fullWidth value={draft} onChange={(e) => setDraft(e.target.value)} />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => resolve(undefined)}>Cancel</Button>
        <Button
          onClick={() => resolve(draft)}
          variant="contained"
          color="primary"
        >
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}

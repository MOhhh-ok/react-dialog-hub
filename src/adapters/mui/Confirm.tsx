import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import type { ReactNode } from "react";
import { type DialogProps } from "react-dialog-hub";

type Input = { title?: ReactNode; content?: ReactNode };
type Output = boolean;
export type ConfirmProps = DialogProps<Input, Output>;

export function ConfirmDialog({ resolve, content, title }: ConfirmProps) {
  return (
    <Dialog open>
      {title && <DialogTitle>{title}</DialogTitle>}
      {content && <DialogContent>{content}</DialogContent>}
      <DialogActions>
        <Button
          onClick={() => resolve(false)}
        >
          Cancel
        </Button>
        <Button
          onClick={() => resolve(true)}
          variant="contained"
          color="primary"
        >
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}

import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import type { ReactNode } from "react";
import { type DialogProps } from "react-dialog-hub";

type Input = {
  title?: ReactNode;
  content?: ReactNode;
};
export type AlertProps = DialogProps<Input>;

export function Alert({ title, content, resolve }: AlertProps) {
  return (
    <Dialog open>
      {title && <DialogTitle>{title}</DialogTitle>}
      {content && <DialogContent>{content}</DialogContent>}
      <DialogActions>
        <Button
          onClick={() => resolve()}
          variant="contained"
          color="primary"
        >
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}

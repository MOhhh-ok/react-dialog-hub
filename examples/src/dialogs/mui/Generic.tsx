// import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
// import { type DialogProps, useDialogs} from "react-dialog-hub";

// type GenericDialogProps<K extends string> = DialogProps<{ labels: Record<K, string> }>;

// export function Generic<K extends string>(props: GenericDialogProps<K>) {
//   const { resolve, labels } = props;

//   return (
//     <Dialog open>
//       <DialogContent>{JSON.stringify({ labels })}</DialogContent>
//       <DialogActions>
//         <Button onClick={() => resolve()} variant="contained" color="primary">OK</Button>
//       </DialogActions>
//     </Dialog>
//   );
// }

// export function GenericTrigger() {
//   const { show } = useDialogs);
//   const keys = ["abc"] as const;
//   return (
//     <button
//       onClick={() =>
//         show(
//           Generic<typeof keys[number]>,
//           {
//             labels: { abc: "abc" },
//           },
//         )}
//     >
//       Alert
//     </button>
//   );
// }

import { AlertTrigger } from "./Alert";
import { ConfirmTrigger } from "./Confirm";

export function PlainDialogsSection() {
  return <section>
    <h2>Plain Dialogs </h2>
    <div className="triggers">
      <AlertTrigger />
      <ConfirmTrigger />
    </div>
  </section>
}
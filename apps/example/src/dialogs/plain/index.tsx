import { AlertTrigger } from "./Alert";
import { ConfirmTrigger } from "./Confirm";
import { ProgressTrigger } from "./Progress";
import { PromptTrigger } from "./Prompt";
import { SelectMultiTrigger } from "./SelectMulti";
import { SelectSingleTrigger } from "./SelectSingle";

export function PlainDialogsSection() {
  return (
    <section>
      <h2>Plain Dialogs</h2>
      <div className="triggers">
        <AlertTrigger />
        <ConfirmTrigger />
        <PromptTrigger />
        <SelectSingleTrigger />
        <SelectMultiTrigger />
        <ProgressTrigger />
      </div>
    </section>
  );
}

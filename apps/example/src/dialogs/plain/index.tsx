import { AlertTrigger } from "./Alert";
import { ConfirmTrigger } from "./Confirm";
import { PromptTrigger } from "./Prompt";
import { SelectSingleTrigger } from "./SelectSingle";
import { SelectMultiTrigger } from "./SelectMulti";
import { ProgressTrigger } from "./Progress";

export function PlainDialogsSection() {
  return <section>
    <h2>Plain Dialogs </h2>
    <div className="triggers">
      <AlertTrigger />
      <ConfirmTrigger />
      <PromptTrigger />
      <SelectSingleTrigger />
      <SelectMultiTrigger />
      <ProgressTrigger />
    </div>
  </section>
}
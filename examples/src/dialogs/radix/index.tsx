import { AlertTrigger } from "./Alert";
import { ConfirmTrigger } from "./Confirm";
import { PromptTrigger } from "./Prompt";
import { ProgressTrigger } from "./Progress";
import { SelectSingleTrigger } from "./SelectSingle";
import { SelectMultiTrigger } from "./SelectMulti";

export function RadixDialogsSection() {
  return <section>
    <h2>Radix Dialogs </h2>
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
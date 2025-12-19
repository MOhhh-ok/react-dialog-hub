import { AlertTrigger } from "./Alert";
import { ConfirmTrigger } from "./Confirm";
import { PromptTrigger } from "./Prompt";
import { SelectSingleTrigger } from "./SelectSingle";
import { SelectMultiTrigger } from "./SelectMulti";
import { ProgressTrigger } from "./Progress";

export function MUIDialogsSection() {
  return <section>
    <h2>MUI Dialogs </h2>
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
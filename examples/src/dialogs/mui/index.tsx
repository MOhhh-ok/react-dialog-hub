import { useDialogs } from "react-dialog-hub";
import { Alert, Confirm, Prompt } from "react-dialog-hub/mui";
import { ProgressTrigger } from "./Progress";
import { SelectMultiTrigger } from "./SelectMulti";
import { SelectSingleTrigger } from "./SelectSingle";

export function MUIDialogsSection() {
  const { show } = useDialogs();
  return (
    <section>
      <h2>MUI Dialogs</h2>
      <div className="triggers">
        <button
          onClick={() => show(Alert, { content: "Hello World!" })}
        >
          Alert
        </button>

        <button
          onClick={async () => {
            const confirmed = await show(Confirm, { content: "Proceed?" });
            if (confirmed) alert("Confirmed!");
          }}
        >
          Confirm
        </button>

        <button
          onClick={async () => {
            const response = await show(Prompt, { content: "What pet do you like?" });
            if (response) alert(`You like ${response}!`);
          }}
        >
          Prompt
        </button>

        <SelectSingleTrigger />
        <SelectMultiTrigger />
        <ProgressTrigger />
      </div>
    </section>
  );
}

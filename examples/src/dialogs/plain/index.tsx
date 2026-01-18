import { useDialogs } from "react-dialog-hub";
import { AlertDialog, ConfirmDialog, PromptDialog } from "react-dialog-hub/native";
import { ProgressTrigger } from "./Progress";
import { SelectMultiTrigger } from "./SelectMulti";
import { SelectSingleTrigger } from "./SelectSingle";

export function PlainDialogsSection() {
  const { show } = useDialogs();
  return (
    <section>
      <h2>Native Dialogs</h2>
      <div className="triggers">
        <button onClick={() => show(AlertDialog, { content: "Hello World!" })}>
          Alert
        </button>

        <button
          onClick={() =>
            show(AlertDialog, {
              content: (
                <div>
                  Hello <span style={{ color: "red" }}>World!</span>
                </div>
              ),
            })}
        >
          Complex Alert
        </button>

        <button
          onClick={async () => {
            const confirmed = await show(ConfirmDialog, { content: "Proceed?" });
            if (confirmed) {
              alert("Confirmed!");
            }
          }}
        >
          Confirm
        </button>

        <button
          onClick={async () => {
            const response = await show(PromptDialog, { content: "What pet do you like?" });
            if (response !== undefined) {
              alert(`You like ${response}!`);
            }
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

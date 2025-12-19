import { useDialogs } from "react-dialog-hub";
import { Alert, Confirm, Prompt } from "react-dialog-hub/native";
import { ProgressTrigger } from "./Progress";
import { SelectMultiTrigger } from "./SelectMulti";
import { SelectSingleTrigger } from "./SelectSingle";

export function PlainDialogsSection() {
  const { show } = useDialogs();
  return (
    <section>
      <h2>Plain Dialogs</h2>
      <div className="triggers">
        <button onClick={() => show(Alert, { content: "Hello World!" })}>
          Alert
        </button>

        <button
          onClick={() =>
            show(Alert, {
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
            const confirmed = await show(Confirm, { content: "Proceed?" });
            if (confirmed) {
              alert("Confirmed!");
            }
          }}
        >
          Confirm
        </button>

        <button
          onClick={async () => {
            const response = await show(Prompt, { content: "What pet do you like?" });
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

import { type ReactNode, useEffect, useRef, useState } from "react";
import { type DialogProps } from "../..";

type Input = {
  content: ReactNode;
  value?: string;
};
type Output = string | undefined;
export type PromptProps = DialogProps<Input, Output>;

export function PromptDialog({ content, value, resolve }: PromptProps) {
  const [draft, setDraft] = useState(value);
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => ref.current?.showModal(), []);

  return (
    <dialog ref={ref}>
      <p>{content}</p>
      <input value={draft} onChange={(e) => setDraft(e.target.value)} />
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.2em" }}>
        <button onClick={() => resolve(undefined)}>Cancel</button>
        <button onClick={() => resolve(draft)}>OK</button>
      </div>
    </dialog>
  );
}

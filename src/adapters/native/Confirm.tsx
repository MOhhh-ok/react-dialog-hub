import { type ReactNode, useEffect, useRef } from "react";
import { type DialogProps } from "../..";

type Input = { content: ReactNode; className?: string };
type Output = boolean;
export type ConfirmProps = DialogProps<Input, Output>;

export function Confirm({ content, className, resolve }: ConfirmProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => ref.current?.showModal(), []);

  return (
    <dialog ref={ref} className={className}>
      {content}
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.2em" }}>
        <button onClick={() => resolve(false)}>Cancel</button>
        <button onClick={() => resolve(true)}>OK</button>
      </div>
    </dialog>
  );
}

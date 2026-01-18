import { type ReactNode, useEffect, useRef } from "react";
import { type DialogProps } from "../..";

type Input = {
  content: ReactNode;
  className?: string;
};

export type AlertProps = DialogProps<Input>;

export function AlertDialog({ content, resolve, className }: AlertProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => ref.current?.showModal(), []);

  return (
    <dialog ref={ref} className={className}>
      {content}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button onClick={() => resolve()}>OK</button>
      </div>
    </dialog>
  );
}

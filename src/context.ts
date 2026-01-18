import { createContext, useContext } from "react";
import type { DialogContextValue } from "./types";

export const DialogsContext = createContext<DialogContextValue | null>(null);

export function useDialogs() {
  const ctx = useContext(DialogsContext);
  if (!ctx) throw new Error("useDialogs must be used within DialogProvider");
  return ctx;
}

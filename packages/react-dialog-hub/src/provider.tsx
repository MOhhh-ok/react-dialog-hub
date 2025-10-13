import { useCallback, useMemo, useState } from "react";
import { DialogContext } from "./context";
import type { DialogBase, DialogComponent, DialogContextValue, StackItem } from "./types";

export function DialogProvider({ children }: { children: React.ReactNode }) {
  const [stack, setStack] = useState<StackItem[]>([]);
  const show = useCallback(<P,>(
    component: DialogComponent<P>,
    props?: Omit<P, keyof DialogBase>
  ) => {
    const id = Date.now() + Math.random();
    return new Promise<void>((resolve, reject) => {
      setStack((s) => [
        ...s,
        { id, component, props: props ?? {}, resolve, reject },
      ]);
    });
  }, []);

  const value = useMemo<DialogContextValue>(() => ({ show }), [show]);

  return (
    <DialogContext.Provider value={value}>
      {children}
      {stack.map((item) => {
        const close = () =>
          setStack((s) => s.filter((x) => x.id !== item.id));
        return (
          <item.component
            key={item.id}
            {...item.props}
            resolve={() => { item.resolve(); close(); }}
            reject={(r?: unknown) => { item.reject(r); close(); }}
          />
        );
      })}
    </DialogContext.Provider>
  );
}

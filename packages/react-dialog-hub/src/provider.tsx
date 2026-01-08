import { useCallback, useMemo, useState } from "react";
import { DialogContext } from "./context";
import type { DialogBase, DialogComponent, DialogContextValue, StackItem } from "./types";

export function DialogsProvider({ children }: { children: React.ReactNode }) {
  const [stack, setStack] = useState<StackItem[]>([]);
  const show = useCallback(<TProps, TResult, TError>(
    component: DialogComponent<TProps, TResult, TError>,
    props?: Omit<TProps, keyof DialogBase<TResult, TError>>,
  ) => {
    const id = Date.now() + Math.random();
    return new Promise<TResult>((resolve, reject) => {
      setStack((s) => [
        ...s,
        {
          id,
          component: component as any,
          props: props ?? {},
          resolve: resolve as any,
          reject: reject as any,
        },
      ]);
    });
  }, []);

  const value = useMemo<DialogContextValue>(() => ({ show }), [show]);

  return (
    <DialogContext.Provider value={value}>
      {children}
      {stack.map((item) => {
        const close = () => setStack((s) => s.filter((x) => x.id !== item.id));
        return (
          <item.component
            key={item.id}
            {...item.props}
            resolve={(r) => {
              item.resolve(r);
              close();
            }}
            reject={(r?: unknown) => {
              item.reject(r);
              close();
            }}
          />
        );
      })}
    </DialogContext.Provider>
  );
}

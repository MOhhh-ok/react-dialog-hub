
export type DialogBase = {
  resolve: () => void;
  reject: (reason?: unknown) => void;
}

export type DialogProps<P = unknown> = P & DialogBase;

export type DialogComponent<P> = (props: DialogProps<P>) => React.ReactNode;

export type StackItem = {
  id: number;
  component: DialogComponent<any>;
  props?: any;
  resolve: DialogBase['resolve'];
  reject: DialogBase['reject'];
};

export type ShowFn = <P>(comp: DialogComponent<P>, props?: Omit<P, keyof DialogBase>) => Promise<void>;

export type DialogContextValue = {
  show: ShowFn;
};



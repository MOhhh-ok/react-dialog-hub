export type DialogBase<TResult, TError> = {
  resolve: (result: TResult) => void;
  reject: (reason?: TError) => void;
};

export type DialogProps<TProps = unknown, TResult = void, TError = unknown> = TProps & DialogBase<TResult, TError>;

export type DialogComponent<TProps, TResult, TError> = (props: DialogProps<TProps, TResult, TError>) => React.ReactNode;

export type StackItem = {
  id: number;
  component: DialogComponent<unknown, unknown, unknown>;
  props?: any;
  resolve: DialogBase<unknown, unknown>["resolve"];
  reject: DialogBase<unknown, unknown>["reject"];
};

export type ShowFn = <TProps, TResult = void, TError = unknown>(
  comp: DialogComponent<TProps, TResult, TError>,
  props?: Omit<TProps, keyof DialogBase<TResult, TError>>,
) => Promise<TResult>;

export type DialogContextValue = {
  show: ShowFn;
};

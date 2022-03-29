interface IReduxAction<T, P> {
  type: T;
  payload?: P;
}

export type { IReduxAction };

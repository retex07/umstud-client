import Store from "./index";

export type RootState = ReturnType<typeof Store.getState>;

export type Dispatch = typeof Store.dispatch;

// https://redux-toolkit.js.org/rtk-query/usage/queries#frequently-used-query-hook-return-values.
export interface CommonUiControlState {
  error: string | null;
  isUninitialized: boolean;
  isLoading: boolean;
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
}

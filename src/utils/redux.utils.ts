import { RootState } from "store/types";

export function createSelector<State = RootState, Selected = unknown>(
  fn: (store: State) => Selected
) {
  return fn;
}

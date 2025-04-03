import { get } from "lodash";
import { createSelector } from "reselect";

import { initialState } from "../reducers/app";
import { RootState } from "../types";

const prefix = "app";

export const selectApp = (state: RootState) =>
  get(state, prefix) || { ...initialState };

export const selectIsLoadingApp = createSelector(selectApp, (state) =>
  get(state, "isLoading")
);

export const selectIsInitializedApp = createSelector(selectApp, (state) =>
  get(state, "isInitialized")
);

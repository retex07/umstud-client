import { get } from "lodash";
import { createSelector } from "reselect";

import { initialState } from "../reducers/user";
import { RootState } from "../types";

const prefix = "user";

export const selectUser = (state: RootState) =>
  get(state, prefix) || { ...initialState };

export const selectUserData = createSelector(selectUser, (state) =>
  get(state, "user")
);
export const selectIsLoading = createSelector(selectUser, (state) =>
  get(state, "isLoading")
);

export const selectActivationAccount = createSelector(selectUser, (state) =>
  get(state, "activation")
);

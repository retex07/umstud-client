import { get } from "lodash";
import { createSelector } from "reselect";

import { initialState } from "../reducers/auth";
import { RootState } from "../types";

const prefix = "auth";

export const selectAuth = (state: RootState) =>
  get(state, prefix) || { ...initialState };

export const selectAccessToken = createSelector(selectAuth, (state) =>
  get(state, "accessToken")
);
export const selectIsLoading = createSelector(selectAuth, (state) =>
  get(state, "isLoading")
);
export const selectLastHistoryState = createSelector(selectAuth, (state) =>
  get(state, "historyState")
);

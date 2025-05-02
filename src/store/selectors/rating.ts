import { get } from "lodash";
import { createSelector } from "reselect";

import { initialState } from "../reducers/rating";
import { RootState } from "../types";

const prefix = "rating";

export const selectRating = (state: RootState) =>
  get(state, prefix) || { ...initialState };

export const selectIsLoadingRating = createSelector(selectRating, (state) =>
  get(state, "isLoading")
);
export const selectRatingList = createSelector(selectRating, (state) =>
  get(state, "list")
);

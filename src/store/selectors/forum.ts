import { get } from "lodash";
import { createSelector } from "reselect";

import { initialState } from "../reducers/forum";
import { RootState } from "../types";

const prefix = "forum";

export const selectForum = (state: RootState) =>
  get(state, prefix) || { ...initialState };

export const selectDiscussion = (state: RootState, key: string) =>
  get(state, [prefix, "discussions", key]) || {};

export const selectIsLoadingForum = createSelector(selectForum, (state) =>
  get(state, "isLoading")
);
export const selectDiscussions = createSelector(selectForum, (state) =>
  get(state, "discussionList")
);

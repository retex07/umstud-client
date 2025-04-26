import { handleActions } from "redux-actions";

import {
  setDiscussion,
  setDiscussionList,
  setIsLoading,
} from "@/store/actions/forum";
import { ForumState } from "@/store/types/forum";

export const initialState: ForumState = {
  isLoading: false,
  discussionList: [],
  discussions: {},
};

Object.freeze(initialState);

export default handleActions<ForumState, any>(
  {
    [setDiscussionList.toString()]: (
      state,
      { payload }: ReturnType<typeof setDiscussionList>
    ) => ({
      ...state,
      discussionList: payload,
    }),
    [setIsLoading.toString()]: (
      state,
      { payload }: ReturnType<typeof setIsLoading>
    ) => ({
      ...state,
      isLoading: payload,
    }),
    [setDiscussion.toString()]: (
      state,
      { payload }: ReturnType<typeof setDiscussion>
    ) => ({
      ...state,
      discussions: {
        ...state.discussions,
        [payload.id]: {
          ...state.discussions[payload.id],
          ...payload,
        },
      },
    }),
  },
  initialState
);

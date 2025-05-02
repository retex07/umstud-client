import { handleActions } from "redux-actions";

import { setIsLoading, setRatingList } from "@/store/actions/rating";
import { StateRating } from "@/store/types/rating";

export const initialState: StateRating = {
  isLoading: false,
  list: [],
};

Object.freeze(initialState);

export default handleActions<StateRating, any>(
  {
    [setRatingList.toString()]: (
      state,
      { payload }: ReturnType<typeof setRatingList>
    ) => ({
      ...state,
      list: payload,
    }),
    [setIsLoading.toString()]: (
      state,
      { payload }: ReturnType<typeof setIsLoading>
    ) => ({
      ...state,
      isLoading: payload,
    }),
  },
  initialState
);

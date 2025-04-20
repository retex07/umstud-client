import { handleActions } from "redux-actions";

import { setIsInitializedApp, setIsLoadingApp } from "../actions/app";
import { AppState } from "../types/app";

export const initialState: AppState = {
  isInitialized: false,
  isLoading: true,
};

Object.freeze(initialState);

export default handleActions(
  {
    [setIsInitializedApp.toString()]: (state, { payload }) => ({
      ...state,
      isInitialized: !!payload,
    }),
    [setIsLoadingApp.toString()]: (state, { payload }) => ({
      ...state,
      isLoading: !!payload,
    }),
  },
  initialState
);

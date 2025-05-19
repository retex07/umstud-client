import { handleActions } from "redux-actions";

import {
  clearToken,
  setHistoryState,
  setIsLoading,
  setToken,
} from "../actions/auth";
import { StateAuth } from "../types/auth";

export const initialState: StateAuth = {
  accessToken: null,
  refreshToken: null,
  isLoading: false,
  historyState: null,
};

Object.freeze(initialState);

export default handleActions<StateAuth, any>(
  {
    [clearToken.toString()]: (state): StateAuth => ({
      ...state,
      accessToken: null,
      refreshToken: null,
      historyState: null,
    }),
    [setToken.toString()]: (
      state,
      { payload }: ReturnType<typeof setToken>
    ): StateAuth => {
      const { accessToken, refreshToken } = payload;

      return {
        ...state,
        accessToken,
        refreshToken,
      };
    },
    [setIsLoading.toString()]: (
      state,
      { payload }: ReturnType<typeof setIsLoading>
    ): StateAuth => ({
      ...state,
      isLoading: payload,
    }),
    [setHistoryState.toString()]: (
      state,
      { payload }: ReturnType<typeof setHistoryState>
    ): StateAuth => ({
      ...state,
      historyState: payload,
    }),
  },
  initialState
);

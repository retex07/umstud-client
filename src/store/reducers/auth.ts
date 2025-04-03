import { handleActions } from "redux-actions";

import { clearToken, setIsLoading, setToken } from "../actions/auth";
import { StateAuth } from "../types/auth";

export const initialState: StateAuth = {
  accessToken: null,
  refreshToken: null,
  isLoading: false,
};

Object.freeze(initialState);

const user = handleActions(
  {
    [clearToken.toString()]: (state) => ({
      ...state,
      accessToken: null,
      refreshToken: null,
    }),
    [setToken.toString()]: (state, { payload }) => {
      const { accessToken, refreshToken } = payload;

      return {
        ...state,
        accessToken,
        refreshToken,
      };
    },
    [setIsLoading.toString()]: (state, { payload }) => ({
      ...state,
      isLoading: !!payload,
    }),
  },
  initialState
);

export default user;

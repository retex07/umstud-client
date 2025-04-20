import { handleActions } from "redux-actions";

import {
  initedActivateAccount,
  setErrorActivateAccount,
  setIsLoading,
  setIsLoadingChats,
  setUser,
} from "../actions/user";
import { UserState } from "../types/user";

export const initialState: UserState = {
  user: null,
  isLoading: false,
  isLoadingChats: false,
  activation: {
    isInitialized: false,
    isError: false,
    isLoading: false,
  },
};

Object.freeze(initialState);

export default handleActions<UserState, any>(
  {
    [setUser.toString()]: (state, { payload }) => ({
      ...state,
      user: payload.user,
    }),
    [setIsLoadingChats.toString()]: (
      state,
      { payload }: ReturnType<typeof setIsLoadingChats>
    ) => ({
      ...state,
      isLoadingChats: payload,
    }),
    [setIsLoading.toString()]: (
      state,
      { payload }: ReturnType<typeof setIsLoading>
    ) => ({
      ...state,
      isLoading: payload,
    }),
    [initedActivateAccount.toString()]: (state, { payload }) => ({
      ...state,
      activation: {
        ...state.activation,
        isInitialized: !!payload,
      },
    }),
    [setErrorActivateAccount.toString()]: (state, { payload }) => ({
      ...state,
      activation: {
        ...state.activation,
        isError: !!payload,
      },
    }),
  },
  initialState
);

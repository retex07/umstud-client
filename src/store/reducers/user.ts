import { handleActions } from "redux-actions";

import {
  initedActivateAccount,
  setErrorActivateAccount,
  setIsLoading,
  setUser,
} from "../actions/user";
import { UserState } from "../types/user";

export const initialState: UserState = {
  user: null,
  isLoading: false,
  activation: {
    isInitialized: false,
    isError: false,
    isLoading: false,
  },
};

Object.freeze(initialState);

const user = handleActions<UserState, any>(
  {
    [setUser.toString()]: (state, { payload }) => ({
      ...state,
      user: payload.user,
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

export default user;

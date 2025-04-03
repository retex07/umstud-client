import { handleActions } from "redux-actions";

import {
  initedActivateAccount,
  setErrorActivateAccount,
  setUser,
} from "../actions/user";
import { UserState } from "../types/user";

export const initialState: UserState = {
  user: null,
  activation: {
    isInitialized: false,
    isError: false,
    isLoading: false,
  },
};

Object.freeze(initialState);

const user = handleActions(
  {
    [setUser.toString()]: (state, { payload }) => ({
      ...state,
      user: payload.user,
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

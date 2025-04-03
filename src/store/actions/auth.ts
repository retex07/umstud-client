import { createAction } from "redux-actions";

import {
  LoginAction,
  RecoverAction,
  RegisterAction,
  ResetAction,
} from "@/api/handlers/auth/types";

const prefix = "auth/";

export const login = createAction<LoginAction>(prefix + "LOGIN");
export const register = createAction<RegisterAction>(prefix + "REGISTER");
export const recover = createAction<RecoverAction>(prefix + "RECOVER");
export const reset = createAction<ResetAction>(prefix + "RESET");

export const setToken = createAction<{
  accessToken: string | null;
  refreshToken: string | null;
}>(prefix + "SET_TOKEN");

export const setIsLoading = createAction<boolean>(prefix + "SET_IS_LOADING");

export const clearToken = createAction(prefix + "CLEAR_TOKEN");
export const logout = createAction(prefix + "LOGOUT");

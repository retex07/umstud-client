import { createAction } from "redux-actions";

import { DetailUserProfile } from "@/api/user/types";

const prefix = "user/";

export const updateUser = createAction(prefix + "UPDATE_USER");
export const setUser = createAction<{ user: DetailUserProfile | null }>(
  prefix + "SET_USER"
);

export const activateUserAccount = createAction(
  prefix + "ACTIVATE_USER_ACCOUNT"
);

export const setLoadingActivateAccount = createAction(
  prefix + "SET_LOADING_ACTIVATE_ACCOUNT"
);
export const initedActivateAccount = createAction(
  prefix + "INITED_ACTIVATE_ACCOUNT"
);
export const setErrorActivateAccount = createAction(
  prefix + "SET_ERROR_ACTIVATE_ACCOUNT"
);

export const setBlackList = createAction(prefix + "SET_BLACK_LIST");

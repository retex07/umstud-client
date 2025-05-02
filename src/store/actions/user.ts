import { createAction } from "redux-actions";

import { BlackList, DetailUserProfile } from "@/api/handlers/user/types";

const prefix = "user/";

export const updateUser = createAction(prefix + "UPDATE_USER");
export const setUser = createAction<{ user: DetailUserProfile | null }>(
  prefix + "SET_USER"
);
export const setIsLoading = createAction<boolean>(prefix + "SET_IS_LOADING");

export const activateUserAccount = createAction<{
  uidb64: string;
  token: string;
}>(prefix + "ACTIVATE_USER_ACCOUNT");

export const getMyProfile = createAction<void>(prefix + "GET_MY_PROFILE");
export const changeMyProfile = createAction<FormData>(
  prefix + "CHANGE_MY_PROFILE"
);

export const setLoadingActivateAccount = createAction<boolean>(
  prefix + "SET_LOADING_ACTIVATE_ACCOUNT"
);
export const initedActivateAccount = createAction<boolean>(
  prefix + "INITED_ACTIVATE_ACCOUNT"
);
export const setErrorActivateAccount = createAction<boolean>(
  prefix + "SET_ERROR_ACTIVATE_ACCOUNT"
);

export const setBlackList = createAction<BlackList>(prefix + "SET_BLACK_LIST");

export const setIsLoadingChats = createAction<boolean>(
  prefix + "SET_IS_LOADING_CHATS"
);

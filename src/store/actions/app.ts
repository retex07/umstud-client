import { createAction } from "redux-actions";

const prefix = "app/";

export const initApp = createAction<void>(prefix + "INIT_APP");

export const setIsInitializedApp = createAction<boolean>(
  prefix + "SET_IS_INITIALIZED_APP"
);
export const setIsLoadingApp = createAction<boolean>(
  prefix + "SET_IS_LOADING_APP"
);

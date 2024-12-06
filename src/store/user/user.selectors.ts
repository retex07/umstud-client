import { createSelector as cs } from "utils/redux.utils";

export const user = cs((store) => store.user);
export const accessToken = cs((store) => store.user.accessToken);

import { createSelector as cs } from "utils/redux.utils";

export const login = cs((store) => store.user);

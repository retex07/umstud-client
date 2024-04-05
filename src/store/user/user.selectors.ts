import { createSelector as cs } from "utils/redux.utils";

export const user = cs((store) => store.user);

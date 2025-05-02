import { createAction } from "redux-actions";

import { UserStars } from "@/api/handlers/rating/types";

const prefix = "rating/";

export const getRatingList = createAction<void>(prefix + "GET_RATING_LIST");
export const setRatingList = createAction<UserStars[]>(
  prefix + "SET_RATING_LIST"
);

export const setIsLoading = createAction<boolean>(prefix + "SET_IS_LOADING");

import { call, put, takeLatest } from "redux-saga/effects";

import { UserStars } from "@/api/handlers/rating/types";
import { ExtraArguments } from "@/api/types";
import {
  getRatingList,
  setIsLoading,
  setRatingList,
} from "@/store/actions/rating";

function* sagaGetRatingList({ api }: ExtraArguments) {
  try {
    yield put(setIsLoading(true));
    const ratingList: UserStars[] = yield call(api.rating.getRatingList);
    yield put(setRatingList(ratingList));
  } catch (error) {
    console.error("[rating sagaGetRatingList saga error]:", error);
  } finally {
    yield put(setIsLoading(false));
  }
}

export default function* rating(ea: ExtraArguments) {
  yield takeLatest(getRatingList.toString(), sagaGetRatingList, ea);
}

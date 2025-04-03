import { all } from "redux-saga/effects";

import { ExtraArguments } from "@/api/types";

import appSaga from "../sagas/app";
import authSaga from "../sagas/auth";
import userSaga from "../sagas/user";

export default function* rootSaga(ea: ExtraArguments) {
  yield all([userSaga(ea), appSaga(ea), authSaga(ea)]);
}

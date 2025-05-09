import { all } from "redux-saga/effects";

import { ExtraArguments } from "@/api/types";

import appSaga from "../sagas/app";
import authSaga from "../sagas/auth";
import chatSaga from "../sagas/chat";
import forumSaga from "../sagas/forum";
import orderSaga from "../sagas/order";
import ratingSaga from "../sagas/rating";
import userSaga from "../sagas/user";

export default function* rootSaga(ea: ExtraArguments) {
  yield all([
    userSaga(ea),
    appSaga(ea),
    authSaga(ea),
    orderSaga(ea),
    chatSaga(ea),
    forumSaga(ea),
    ratingSaga(ea),
  ]);
}

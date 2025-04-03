import { call, put, takeLatest } from "redux-saga/effects";

import { ExtraArguments } from "@/api/types";

import {
  activateUserAccount,
  initedActivateAccount,
  setLoadingActivateAccount,
  setErrorActivateAccount,
} from "../actions/user";

function* activateUserAccountSaga(
  { api }: ExtraArguments,
  { payload }: ReturnType<typeof activateUserAccount>
) {
  try {
    const { uidb64, token } = payload;
    yield put(setLoadingActivateAccount(true));
    yield call(api.user.activateAccount, uidb64, token);
  } catch (error) {
    yield put(setErrorActivateAccount(true));
    console.error("[user activateUserAccountSaga saga error]:", error);
  } finally {
    yield put(initedActivateAccount(true));
    yield put(setLoadingActivateAccount(false));
  }
}

export default function* user(ea: ExtraArguments) {
  yield takeLatest(activateUserAccount.toString(), activateUserAccountSaga, ea);
}

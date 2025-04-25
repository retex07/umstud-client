import axios from "axios";
import toast from "react-hot-toast";
import { call, put, takeLatest } from "redux-saga/effects";

import {
  Login_Response,
  PasswordReset_Response,
  PasswordResetConfirm_Response,
  Register_Response,
} from "@/api/handlers/auth/types";
import { DetailUserProfile } from "@/api/handlers/user/types";
import { ExtraArguments } from "@/api/types";
import { clearState, setIsLoadingApp } from "@/store/actions/app";

import {
  logout,
  login,
  setToken,
  setIsLoading,
  register,
  recover,
  reset,
} from "../actions/auth";
import { setUser } from "../actions/user";

function* loginSaga(
  { api }: ExtraArguments,
  { payload }: ReturnType<typeof login>
) {
  try {
    yield put(setIsLoading(true));

    const loginResponse: Login_Response = yield call(
      api.auth.login,
      payload.data
    );

    const {
      tokens: { access, refresh },
    } = loginResponse;

    yield put(setToken({ accessToken: access, refreshToken: refresh }));

    localStorage.setItem("accessToken", access);
    localStorage.setItem("refreshToken", refresh);

    const myProfileData: DetailUserProfile = yield call(api.user.getMyProfile);
    if (myProfileData) {
      yield put(setUser({ user: myProfileData }));
    } else {
      throw new Error("Error when receiving profile data");
    }

    if (payload.onSuccess) {
      payload.onSuccess(loginResponse);
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      payload.onError(error);
    }

    console.error("[auth loginSaga saga error]:", error);
  } finally {
    yield put(setIsLoading(false));
  }
}

function* registerSaga(
  { api }: ExtraArguments,
  { payload }: ReturnType<typeof register>
) {
  try {
    yield put(setIsLoading(true));

    const registerResponse: Register_Response = yield call(
      api.auth.register,
      payload.data
    );

    const { message } = registerResponse;
    yield toast.success(message, { duration: 5000 });

    if (payload.onSuccess) {
      payload.onSuccess(registerResponse);
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      payload.onError(error);
    }

    console.error("[auth registerSaga saga error]:", error);
  } finally {
    yield put(setIsLoading(false));
  }
}

function* recoverSaga(
  { api }: ExtraArguments,
  { payload }: ReturnType<typeof register>
) {
  try {
    yield put(setIsLoading(true));

    const recoverResponse: PasswordReset_Response = yield call(
      api.auth.recover,
      payload.data
    );

    const { message } = recoverResponse;
    toast.success(message, { duration: 5000 });

    if (payload.onSuccess) {
      payload.onSuccess(recoverResponse);
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      payload.onError(error);
    }

    console.error("[auth recoverSaga saga error]:", error);
  } finally {
    yield put(setIsLoading(false));
  }
}

function* resetSaga(
  { api }: ExtraArguments,
  { payload }: ReturnType<typeof reset>
) {
  try {
    yield put(setIsLoading(true));
    const { data, uidb64, token, onSuccess } = payload;

    if (!uidb64 || !token) {
      throw new Error("Error when receiving reset token");
      return;
    }

    const resetResponse: PasswordResetConfirm_Response = yield call(
      api.auth.reset,
      data,
      uidb64,
      token
    );

    const { message } = resetResponse;
    toast.success(message, { duration: 5000 });

    if (onSuccess) {
      onSuccess(resetResponse);
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      payload.onError(error);
    }

    console.error("[auth resetSaga saga error]:", error);
  } finally {
    yield put(setIsLoading(false));
  }
}

function* logoutSaga() {
  try {
    yield put(clearState());
    yield put(setIsLoadingApp(false));
    localStorage.clear();
  } catch (error) {
    console.error("[auth logoutSaga saga error]:", error);
  }
}

export default function* auth(ea: ExtraArguments) {
  yield takeLatest(logout.toString(), logoutSaga);
  yield takeLatest(login.toString(), loginSaga, ea);
  yield takeLatest(register.toString(), registerSaga, ea);
  yield takeLatest(recover.toString(), recoverSaga, ea);
  yield takeLatest(reset.toString(), resetSaga, ea);
}

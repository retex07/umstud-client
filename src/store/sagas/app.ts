import { put, takeLatest, call, select } from "redux-saga/effects";

import { DetailUserProfile } from "@/api/handlers/user/types";
import { ExtraArguments } from "@/api/types";
import urls from "@/services/router/urls";

import { initApp, setIsInitializedApp, setIsLoadingApp } from "../actions/app";
import { logout, setToken } from "../actions/auth";
import { setUser } from "../actions/user";
import { selectUserData } from "../selectors/user";

function* initAppSaga({ api, history }: ExtraArguments) {
  try {
    yield put(setIsLoadingApp(true));

    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (accessToken && refreshToken) {
      yield put(
        setToken({
          accessToken,
          refreshToken,
        })
      );
    } else {
      yield put(logout());
      return;
    }

    const location = window.location;

    if (!history) {
      throw new Error("The 'history' parameter is required");
      return;
    }

    const myProfileData: DetailUserProfile = yield call(api.user.getMyProfile);
    if (myProfileData) {
      yield put(setUser({ user: myProfileData }));
    } else {
      throw new Error("Error when receiving profile data");
      return;
    }

    const userProfile: DetailUserProfile = yield select((state) =>
      selectUserData(state)
    );

    if (!accessToken || !userProfile) {
      if (
        location.pathname.includes(urls.profile.index) &&
        !location.pathname.includes(urls.profile.item.replace(":profileId", ""))
      ) {
        history.push(urls.auth.index + urls.auth.signIn);
      }
    }

    yield put(setIsInitializedApp(true));
  } catch (error) {
    console.error("[app initAppSaga saga error]:", error);
    yield put(logout());
  } finally {
    yield put(setIsLoadingApp(false));
  }
}

export default function* app(ea: ExtraArguments) {
  yield takeLatest(initApp.toString(), initAppSaga, ea);
}

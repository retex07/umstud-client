import toast from "react-hot-toast";
import { call, put, select, takeLatest } from "redux-saga/effects";

import {
  UserPut_RequestBody,
  DetailUserProfile,
} from "@/api/handlers/user/types";
import { ExtraArguments } from "@/api/types";
import urls from "@/services/router/urls";
import { selectUserData } from "@/store/selectors/user";
import { t } from "@/utils/util";

import {
  activateUserAccount,
  initedActivateAccount,
  setLoadingActivateAccount,
  setErrorActivateAccount,
  getMyProfile,
  setUser,
  changeMyProfile,
  setIsLoading,
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

function* sagaGetMyProfile({ api }: ExtraArguments) {
  try {
    const myProfileData: DetailUserProfile = yield call(api.user.getMyProfile);
    yield put(setUser({ user: myProfileData }));
  } catch (error) {
    console.error("[user sagaGetMyProfile saga error]:", error);
  }
}

function* sagaChangeMyProfile(
  { api, history }: ExtraArguments,
  { payload: formData }: ReturnType<typeof changeMyProfile>
) {
  try {
    yield put(setIsLoading(true));

    const selectMyProfile: DetailUserProfile = yield select(selectUserData);
    const myProfileData: UserPut_RequestBody = yield call(
      api.user.editProfile,
      formData
    );

    yield put(
      setUser({
        user: {
          ...selectMyProfile,
          ...myProfileData,
          skills: selectMyProfile.skills,
        },
      })
    );

    yield put(getMyProfile());

    toast.success(t("p_profile", { keyPrefix: "edit.notification" }), {
      duration: 5000,
    });

    console.log(myProfileData);
    history.replace(
      urls.profile.index +
        urls.profile.item.replace(":profileId", selectMyProfile.slug)
    );
  } catch (error) {
    console.error("[user sagaChangeMyProfile saga error]:", error);
  } finally {
    yield put(setIsLoading(false));
  }
}

export default function* user(ea: ExtraArguments) {
  yield takeLatest(activateUserAccount.toString(), activateUserAccountSaga, ea);
  yield takeLatest(getMyProfile.toString(), sagaGetMyProfile, ea);
  yield takeLatest(changeMyProfile.toString(), sagaChangeMyProfile, ea);
}

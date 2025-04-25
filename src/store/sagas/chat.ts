import toast from "react-hot-toast";
import { call, put, select, takeLatest } from "redux-saga/effects";

import { ChatCreateResponse, ChatRoom } from "@/api/handlers/chat/types";
import { ExtraArguments } from "@/api/types";
import urls from "@/services/router/urls";
import {
  createChat,
  getChat,
  getChats,
  setChatIsLoading,
  setChatMeta,
  setChats,
} from "@/store/actions/chat";
import { setIsLoadingChats } from "@/store/actions/user";
import { selectUserData } from "@/store/selectors/user";
import { UserState } from "@/store/types/user";
import { t } from "@/utils/util";

function* sagaGetChats({ api }: ExtraArguments) {
  try {
    const myProfileData: UserState["user"] = yield select(selectUserData);
    yield put(setIsLoadingChats(true));
    const chats: ChatRoom[] = yield call(api.chat.getChats);

    if (myProfileData) {
      yield put(setChats({ chats, slugMyProfile: myProfileData.slug }));
    }
  } catch (error) {
    console.error("[chat sagaGetChats saga error]:", error);
  } finally {
    yield put(setIsLoadingChats(false));
  }
}

function* sagaGetChat(
  { api }: ExtraArguments,
  { payload }: ReturnType<typeof getChat>
) {
  try {
    const myProfileData: UserState["user"] = yield select(selectUserData);
    yield put(setChatIsLoading({ stateId: payload, isLoading: true }));
    const chat: ChatRoom = yield call(api.chat.getChatRoom, payload);

    if (myProfileData) {
      yield put(setChatMeta({ chat, slugMyProfile: myProfileData.slug }));
    }
  } catch (error) {
    console.error("[chat sagaGetChat saga error]:", error);
  } finally {
    yield put(setChatIsLoading({ stateId: payload, isLoading: false }));
  }
}

function* sagaCreateChat(
  { api, history }: ExtraArguments,
  { payload }: ReturnType<typeof createChat>
) {
  try {
    const res: ChatCreateResponse = yield call(api.chat.createChat, payload);
    yield put(getChats());

    if (res.chat) {
      history.push(
        urls.profile.index +
          urls.profile.messages.item.replace(":roomId", res.chat.toString())
      );
    }
  } catch (error) {
    console.error("[chat sagaCreateChat saga error]:", error);
    toast.error(t("c_cards", { keyPrefix: "goToChat.getError" }));
  }
}

export default function* chat(ea: ExtraArguments) {
  yield takeLatest(getChats.toString(), sagaGetChats, ea);
  yield takeLatest(getChat.toString(), sagaGetChat, ea);
  yield takeLatest(createChat.toString(), sagaCreateChat, ea);
}

import toast from "react-hot-toast";
import { call, put, select, takeLatest } from "redux-saga/effects";

import { ChatCreateResponse, ChatRoom } from "@/api/handlers/chat/types";
import { ExtraArguments } from "@/api/types";
import urls from "@/services/router/urls";
import {
  addSocketMessage,
  addSocketNotificationMessage,
  createChat,
  getChat,
  getChats,
  sendRequestAdmin,
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

function* sagaSendRequestAdmin(
  { api }: ExtraArguments,
  { payload }: ReturnType<typeof sendRequestAdmin>
) {
  try {
    yield put(
      setChatIsLoading({ isLoading: true, stateId: payload.toString() })
    );
    yield call(api.chat.requestAdmin, payload);
    yield put(getChat(payload.toString()));
    toast.success(
      t("p_profile", { keyPrefix: "messages.room.actions.successInvitedAdmin" })
    );
  } catch (error) {
    console.error("[chat sagaSendRequestAdmin saga error]:", error);
  } finally {
    yield put(
      setChatIsLoading({ isLoading: false, stateId: payload.toString() })
    );
  }
}

function* sagaAddSocketNotificationMessage(
  {},
  { payload }: ReturnType<typeof addSocketNotificationMessage>
) {
  try {
    const { callback, ...props } = payload;
    yield put(
      addSocketMessage({
        isMyMessage: false,
        roomId: props.data.room_id,
        data: {
          sender: props.data.sender,
          is_read: props.data.is_read,
          message: props.data.message_preview,
          messageId: props.data.messageId,
          timestamp: props.data.timestamp,
        },
      })
    );

    if (callback) {
      callback();
    }
  } catch (error) {
    console.error("[chat sagaAddSocketNotificationMessage saga error]:", error);
  }
}

export default function* chat(ea: ExtraArguments) {
  yield takeLatest(getChats.toString(), sagaGetChats, ea);
  yield takeLatest(getChat.toString(), sagaGetChat, ea);
  yield takeLatest(createChat.toString(), sagaCreateChat, ea);
  yield takeLatest(sendRequestAdmin.toString(), sagaSendRequestAdmin, ea);
  yield takeLatest(
    addSocketNotificationMessage.toString(),
    sagaAddSocketNotificationMessage,
    ea
  );
}

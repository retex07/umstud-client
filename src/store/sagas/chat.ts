import { call, put, takeLatest } from "redux-saga/effects";

import { ChatRoom } from "@/api/handlers/chat/types";
import { ExtraArguments } from "@/api/types";
import {
  getChat,
  getChats,
  setChatIsLoading,
  setChatMeta,
  setChats,
} from "@/store/actions/chat";
import { setIsLoadingChats } from "@/store/actions/user";

function* sagaGetChats({ api }: ExtraArguments) {
  try {
    yield put(setIsLoadingChats(true));
    const chats: ChatRoom[] = yield call(api.chat.getChats);
    yield put(setChats(chats));
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
    yield put(setChatIsLoading({ stateId: payload, isLoading: true }));
    const chat: ChatRoom = yield call(api.chat.getChatRoom, payload);
    yield put(setChatMeta(chat));
  } catch (error) {
    console.error("[chat sagaGetChat saga error]:", error);
  } finally {
    yield put(setChatIsLoading({ stateId: payload, isLoading: false }));
  }
}

export default function* chat(ea: ExtraArguments) {
  yield takeLatest(getChats.toString(), sagaGetChats, ea);
  yield takeLatest(getChat.toString(), sagaGetChat, ea);
}

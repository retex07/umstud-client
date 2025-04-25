import { createAction } from "redux-actions";

import {
  ChatCreate,
  ChatRoom,
  ChatSocketEventData,
} from "@/api/handlers/chat/types";

const prefix = "chat/";

export const getChats = createAction<void>(prefix + "GET_CHATS");
export const getChat = createAction<string>(prefix + "GET_CHAT");
export const addSocketMessage = createAction<{
  data: ChatSocketEventData;
  roomId: number;
  isMyMessage: boolean;
}>(prefix + "ADD_SOCKET_MESSAGE");

export const setChats = createAction<{
  chats: ChatRoom[];
  slugMyProfile: string;
}>(prefix + "SET_CHATS");
export const setChatMeta = createAction<{
  chat: ChatRoom;
  slugMyProfile: string;
}>(prefix + "SET_CHAT_META");
export const setChatIsLoading = createAction<{
  isLoading: boolean;
  stateId: string;
}>(prefix + "SET_CHAT_IS_LOADING");

export const createChat = createAction<ChatCreate>(prefix + "CREATE_CHAR");

import { createAction } from "redux-actions";

import { ChatRoom, ChatSocketEventData } from "@/api/handlers/chat/types";

const prefix = "chat/";

export const getChats = createAction<void>(prefix + "GET_CHATS");
export const getChat = createAction<string>(prefix + "GET_CHAT");
export const addSocketMessage = createAction<{
  data: ChatSocketEventData;
  roomId: number;
}>(prefix + "ADD_SOCKET_MESSAGE");

export const setChats = createAction<ChatRoom[]>(prefix + "SET_CHATS");
export const setChatMeta = createAction<ChatRoom>(prefix + "SET_CHAT_META");
export const setChatIsLoading = createAction<{
  isLoading: boolean;
  stateId: string;
}>(prefix + "SET_CHAT_IS_LOADING");

import { ENDPOINTS_CONFIG } from "@/api/endpoints";
import http from "@/api/http";
import { PureResponse } from "@/api/types";

import { ChatRoom } from "./types";

export type ApiChatHandlers = {
  getChatRoom: (chatId: string) => PureResponse<ChatRoom>;
  getChats: () => PureResponse<ChatRoom[]>;
};

const API = ENDPOINTS_CONFIG.api;

export default function ApiChat(): ApiChatHandlers {
  const getChats: ApiChatHandlers["getChats"] = async () => {
    return (await http.get(API.chats.list)).data;
  };

  const getChatRoom: ApiChatHandlers["getChatRoom"] = async (chatId) => {
    return (await http.get(API.chats.list + chatId + "/")).data;
  };

  return { getChats, getChatRoom };
}

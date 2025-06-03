import { ENDPOINTS_CONFIG } from "@/api/endpoints";
import http from "@/api/http";
import { PureResponse } from "@/api/types";

import { ChatRoom, ChatCreate } from "./types";

export type ApiChatHandlers = {
  getChatRoom: (chatId: string) => PureResponse<ChatRoom>;
  getChats: () => PureResponse<ChatRoom[]>;
  createChat: (body: ChatCreate) => PureResponse<ChatRoom[]>;
  requestAdmin: (chatRoomId: ChatRoom["id"]) => PureResponse<string[]>;
};

const API = ENDPOINTS_CONFIG.api;

export default function ApiChat(): ApiChatHandlers {
  const getChats: ApiChatHandlers["getChats"] = async () => {
    return (await http.get(API.chats.list)).data;
  };

  const getChatRoom: ApiChatHandlers["getChatRoom"] = async (chatId) => {
    return (await http.get(API.chats.list + chatId + "/")).data;
  };

  const createChat: ApiChatHandlers["createChat"] = async (body) => {
    return (await http.post(API.chats.create, body)).data;
  };

  const requestAdmin: ApiChatHandlers["requestAdmin"] = async (chatRoomId) => {
    return (
      await http.put(
        API.chats.requestAdmin.replace(":roomId", chatRoomId.toString()),
        {}
      )
    ).data;
  };

  return { getChats, getChatRoom, createChat, requestAdmin };
}

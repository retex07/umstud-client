import { ChatRoom } from "@/api/handlers/chat/types";

export type StateChat = {
  isLoading: boolean;
  meta: ChatRoom | null;
  messages: ChatRoom["messages"];
};

export type StateChats = {
  [key: string]: StateChat;
};

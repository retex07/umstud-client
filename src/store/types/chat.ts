import { ChatRoom } from "@/api/handlers/chat/types";

export type StateChat = { isLoading: boolean; meta: ChatRoom | null };

export type StateChats = {
  [key: string]: StateChat;
};

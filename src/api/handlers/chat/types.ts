export type CustomUser = {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  slug: string;
  photo: string;
};

export type ChatRoom = {
  id: number;
  participants: CustomUser[];
  interlocutor: CustomUser;
  created_at: string | null;
  created_chat_at: string;
  is_closed: boolean;
  messages: Message[];
  last_message: Message;
  ad: {
    author: number;
    budget: number;
    id: number;
    orderNumber: number;
    title: string;
  } | null;
};

export type Message = {
  id: number;
  room: number;
  sender: CustomUser;
  content: string;
  file?: string;
  created_at: string;
  updated_at?: string;
  is_read?: boolean;
};

export type ChatSendMessageWS = {
  senderId: number;
  message: string;
};

export type ChatSocketEventData = Pick<
  Message,
  "file" | "sender" | "is_read"
> & {
  message: Message["content"];
  messageId: Message["id"];
  timestamp: string;
};

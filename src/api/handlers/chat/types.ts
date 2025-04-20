export type CustomUser = {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  photo: string;
};

export type ChatRoom = {
  id: number;
  participants: CustomUser[];
  created_at: string;
  messages: Message[];
  last_message: Message;
};

export type Message = {
  id: number;
  room: number;
  sender: CustomUser;
  content: string;
  file?: string;
  created_at?: string;
  updated_at?: string;
  is_read?: boolean;
};

export type ChatSendMessageWS = {
  senderId: number;
  message: string;
};

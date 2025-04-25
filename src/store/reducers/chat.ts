import { handleActions } from "redux-actions";

import {
  addSocketMessage,
  setChatIsLoading,
  setChatMeta,
  setChats,
} from "@/store/actions/chat";

import { StateChat, StateChats } from "../types/chat";

export const initialState: StateChats = {};
export const defaultState: StateChat = {
  isLoading: false,
  meta: null,
  messages: [],
  countNotReadMessages: 0,
};

Object.freeze(initialState);
Object.freeze(defaultState);

export default handleActions<StateChats, any>(
  {
    [setChatIsLoading.toString()]: (
      state,
      { payload }: ReturnType<typeof setChatIsLoading>
    ) => ({
      ...state,
      [payload.stateId]: {
        ...defaultState,
        ...state[payload.stateId],
        isLoading: payload.isLoading,
      },
    }),
    [addSocketMessage.toString()]: (
      state,
      { payload }: ReturnType<typeof addSocketMessage>
    ) => {
      return {
        ...state,
        [payload.roomId]: {
          ...defaultState,
          ...state[payload.roomId],
          countNotReadMessages:
            !payload.isMyMessage && !payload.data.is_read
              ? (state[payload.roomId]?.countNotReadMessages || 0) + 1
              : state[payload.roomId]?.countNotReadMessages || 0,
          messages: [
            ...(state[payload.roomId]?.messages || []),
            {
              id: payload.data.messageId,
              room: payload.roomId,
              sender: payload.data.sender,
              content: payload.data.message,
              file: payload.data.file,
              created_at: payload.data.timestamp,
              is_read: payload.data.is_read,
            },
          ],
          meta: {
            ...state[payload.roomId]?.meta,
            last_message: {
              id: payload.data.messageId,
              room: payload.roomId,
              sender: payload.data.sender,
              content: payload.data.message,
              file: payload.data.file,
              created_at: payload.data.timestamp,
              is_read: payload.data.is_read,
            },
          },
        },
      };
    },
    [setChatMeta.toString()]: (
      state,
      { payload }: ReturnType<typeof setChatMeta>
    ) => ({
      ...state,
      [payload.chat.id]: {
        ...defaultState,
        ...state[payload.chat.id],
        meta: payload.chat,
        messages: payload.chat.messages,
        countNotReadMessages: payload.chat.messages.reduce((acc, message) => {
          if (
            message.sender.slug !== payload.slugMyProfile &&
            !message.is_read
          ) {
            return acc + 1;
          }

          return acc;
        }, 0),
      },
    }),
    [setChats.toString()]: (
      state,
      { payload }: ReturnType<typeof setChats>
    ) => {
      return {
        ...state,
        ...payload.chats.reduce(
          (acc, chat) => ({
            ...acc,
            [chat.id]: {
              ...defaultState,
              ...state[chat.id],
              isLoading: state[chat.id]?.isLoading || false,
              messages: chat.messages ?? [],
              meta: chat,
              countNotReadMessages: chat.messages.reduce((acc, message) => {
                if (
                  message.sender.slug !== payload.slugMyProfile &&
                  !message.is_read
                ) {
                  return acc + 1;
                }

                return acc;
              }, 0),
            },
          }),
          {}
        ),
      };
    },
  },
  initialState
);

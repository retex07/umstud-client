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
          ...state[payload.roomId],
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
        },
      };
    },
    [setChatMeta.toString()]: (
      state,
      { payload }: ReturnType<typeof setChatMeta>
    ) => ({
      ...state,
      [payload.id]: {
        ...state[payload.id],
        meta: payload,
        messages: payload.messages,
      },
    }),
    [setChats.toString()]: (
      state,
      { payload }: ReturnType<typeof setChats>
    ) => {
      return {
        ...state,
        ...payload.reduce(
          (acc, chat) => ({
            ...acc,
            [chat.id]: {
              ...state[chat.id],
              isLoading: state[chat.id]?.isLoading || false,
              messages: chat.messages ?? [],
              meta: chat,
            },
          }),
          {}
        ),
      };
    },
  },
  initialState
);

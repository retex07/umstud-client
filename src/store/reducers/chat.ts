import { handleActions } from "redux-actions";

import { setChatIsLoading, setChatMeta, setChats } from "@/store/actions/chat";

import { StateChat, StateChats } from "../types/chat";

export const initialState: StateChats = {};
export const defaultState: StateChat = {
  isLoading: false,
  meta: null,
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
    [setChatMeta.toString()]: (
      state,
      { payload }: ReturnType<typeof setChatMeta>
    ) => ({
      ...state,
      [payload.id]: {
        ...state[payload.id],
        meta: payload,
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

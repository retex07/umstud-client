import { get, isNumber } from "lodash";

import { defaultState, initialState } from "@/store/reducers/chat";
import { RootState } from "@/store/types";
import { StateChat } from "@/store/types/chat";

export const selectChat = (state: RootState, key: string): StateChat =>
  get(state, ["chat", key], { ...defaultState }) || {};

export const selectChats = (state: RootState): StateChat[] =>
  Object.values(get(state, "chat", { ...initialState }) || {}).sort((a, b) => {
    const dateA = new Date(
      a.meta?.last_message?.created_at ?? a.meta?.created_chat_at ?? 0
    ).getTime();
    const dateB = new Date(
      b.meta?.last_message?.created_at ?? b.meta?.created_chat_at ?? 0
    ).getTime();
    return dateB - dateA;
  });

export const countNotReadChats = (state: RootState): number => {
  const count = Object.values(
    get(state, "chat", { ...initialState }) || {}
  )?.reduce((acc, chat) => {
    if (chat && chat.countNotReadMessages > 0) {
      return acc + 1;
    }

    return acc;
  }, 0);

  return isNumber(count) ? count : 0;
};

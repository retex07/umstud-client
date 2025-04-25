import { get, isNumber } from "lodash";

import { defaultState, initialState } from "@/store/reducers/chat";
import { RootState } from "@/store/types";
import { StateChat, StateChats } from "@/store/types/chat";

export const selectChat = (state: RootState, key: string): StateChat =>
  get(state, ["chat", key], { ...defaultState }) || {};

export const selectChats = (state: RootState): StateChats =>
  get(state, "chat", { ...initialState }) || {};

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

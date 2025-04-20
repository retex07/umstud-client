import { get } from "lodash";

import { defaultState, initialState } from "@/store/reducers/chat";
import { RootState } from "@/store/types";
import { StateChat, StateChats } from "@/store/types/chat";

export const selectChat = (state: RootState, key: string): StateChat =>
  get(state, ["chat", key], { ...defaultState }) || {};

export const selectChats = (state: RootState): StateChats =>
  get(state, "chat", { ...initialState }) || {};

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { LoginReducer, State } from "./user.types";
import { DetailUserProfile } from "../../api/queries/user/types";
import Store from "../index";

const initialState: State = {
  user: null,
  accessToken: null,
  refreshToken: null,
};

export function initializeState() {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  if (accessToken && refreshToken) {
    Store.dispatch(
      actions.login({
        access: accessToken,
        refresh: refreshToken,
      })
    );
  } else {
    Store.dispatch(actions.logout());
  }
}

export const { actions, reducer } = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.user = null;
    },
    login: (state, action: PayloadAction<LoginReducer>) => {
      state.accessToken = action.payload.access;
      state.refreshToken = action.payload.refresh;
      localStorage.setItem("accessToken", state.accessToken);
      localStorage.setItem("refreshToken", state.refreshToken);
    },
    updateToken: (state, action: PayloadAction<LoginReducer>) => {
      state.accessToken = action.payload.access;
      state.refreshToken = action.payload.refresh;
      localStorage.setItem("accessToken", state.accessToken);
      localStorage.setItem("refreshToken", state.refreshToken);
    },
    updateUser: (state, action: PayloadAction<DetailUserProfile>) => {
      state.user = action.payload;
    },
  },
});

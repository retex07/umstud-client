import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { LoginReducer, State } from "./user.types";

const initialState: State = {
  user: null,
  accessToken: null,
  refreshToken: null,
};

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
    },
    update: (state, action: PayloadAction<LoginReducer>) => {
      state.accessToken = action.payload.access;
      state.refreshToken = action.payload.refresh;
      localStorage.setItem("accessToken", state.accessToken);
    },
  },
});

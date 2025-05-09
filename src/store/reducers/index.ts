import { combineReducers, Action } from "redux";

import { clearState } from "@/store/actions/app";

import appReducer from "./app";
import authReducer, { initialState as initialStateAuth } from "./auth";
import chatReducer, { initialState as initialStateChat } from "./chat";
import forumReducer from "./forum";
import orderReducer from "./order";
import ratingReducer from "./rating";
import userReducer, { initialState as initialStateUser } from "./user";

const appReducers = combineReducers({
  auth: authReducer,
  user: userReducer,
  app: appReducer,
  order: orderReducer,
  chat: chatReducer,
  forum: forumReducer,
  rating: ratingReducer,
});

const rootReducer = (
  state: ReturnType<typeof appReducers> | undefined,
  action: Action<any>
): ReturnType<typeof appReducers> => {
  if (action.type === clearState.toString()) {
    if (state) {
      state = {
        ...state,
        auth: initialStateAuth,
        chat: initialStateChat,
        user: initialStateUser,
      };
    }
  }

  // @ts-ignore
  return appReducers(state, action);
};

export default rootReducer;

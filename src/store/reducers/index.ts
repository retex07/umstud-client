import { combineReducers } from "redux";

import appReducer from "./app";
import authReducer from "./auth";
import userReducer from "./user";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  app: appReducer,
});

export default rootReducer;

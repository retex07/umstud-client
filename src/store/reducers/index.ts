import { combineReducers } from "redux";

import appReducer from "./app";
import authReducer from "./auth";
import orderReducer from "./order";
import userReducer from "./user";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  app: appReducer,
  order: orderReducer,
});

export default rootReducer;

import { createStore, applyMiddleware, compose, Middleware } from "redux";
import { createLogger } from "redux-logger";
import createSagaMiddleware, { SagaMiddleware } from "redux-saga";

import { configureAPI } from "@/api";
import { getHistory } from "@/services/router/history";

import rootReducer from "./reducers";
import rootSaga from "./sagas";

const { api } = configureAPI();

const sagaMiddleware: SagaMiddleware = createSagaMiddleware();

const middleware: Middleware[] = [sagaMiddleware];

if (process.env.NODE_ENV === "development") {
  const logger = createLogger({
    collapsed: true,
    diff: true,
  });

  middleware.push(logger);
}

const composeEnhancers =
  (process.env.NODE_ENV === "development" &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleware))
);

sagaMiddleware.run(rootSaga, { api, history: getHistory() });

export default store;

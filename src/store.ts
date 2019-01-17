import { routerMiddleware } from "connected-react-router";
import { History, MemoryHistory } from "history";
import { applyMiddleware, compose, createStore, Middleware } from "redux";
import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";

import { createRootReducer, RootState } from "./reducers";
import rootSaga from "./sagas";
import { IS_CLIENT, IS_PRODUCTION } from "./settings";

type AnyHistory = History | MemoryHistory;

const makeStore = (initialState: Partial<RootState>, history: AnyHistory) => {
  const sagaMiddleware = createSagaMiddleware();

  const middleware: Middleware[] = [sagaMiddleware];
  if (history) {
    middleware.push(routerMiddleware(history));
  }

  if (IS_CLIENT && !IS_PRODUCTION) {
    middleware.push(createLogger());
  }

  const enhancers = [applyMiddleware(...middleware)];
  if (typeof window === "object" && typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== "undefined") {
    enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__());
  }

  const store = createStore(createRootReducer(history), initialState, compose(...enhancers));

  if (module.hot) {
    module.hot.accept("./reducers", () => {
      const nextReducer = require("./reducers").default;
      store.replaceReducer(nextReducer);
    });
  }

  (store as any).saga = sagaMiddleware.run(rootSaga);

  return store;
};

export default makeStore;

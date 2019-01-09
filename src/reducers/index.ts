import { connectRouter, RouterState } from "connected-react-router";
import { History } from "history";
import { combineReducers } from "redux";

import { user, UserState } from "./user";

export interface RootState {
  router?: RouterState;
  user: UserState;
}

export const createRootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    user,
  });

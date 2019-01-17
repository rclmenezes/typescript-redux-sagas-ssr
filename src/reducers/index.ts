import { connectRouter, RouterState } from "connected-react-router";
import { History } from "history";
import { combineReducers } from "redux";

import { forgotPasswordSuccess } from "./forgotPasswordSuccess";
import { resetPasswordSuccess } from "./resetPasswordSuccess";
import { showErrorPage } from "./showErrorPage";
import { user, UserState } from "./user";

export interface RootState {
  forgotPasswordSuccess: boolean;
  resetPasswordSuccess: boolean;
  router?: RouterState;
  showErrorPage: boolean;
  user: UserState;
}

export const createRootReducer = (history: History) =>
  combineReducers({
    forgotPasswordSuccess,
    resetPasswordSuccess,
    router: connectRouter(history),
    showErrorPage,
    user,
  });

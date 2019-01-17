import { AxiosError } from "axios";
import { push } from "connected-react-router";
import { call, put } from "redux-saga/effects";

import actionCreators from "../actions";
import { Login, ResetPassword } from "../actions/auth";
import { createFormikSubmitSaga, FormikAction, handleFormErrors } from "./utils/formikSaga";
import { createServiceSaga, POST } from "./utils/serviceSaga";

export const forgotPasswordSaga = createFormikSubmitSaga(
  actionCreators.forgotPassword,
  "/api/forgot-password",
);

export const loginSaga = createServiceSaga({
  actionCreator: actionCreators.login,
  extractDataFromAction: action => action.payload.data,
  method: POST,
  *onError(action: FormikAction<Login>, error: AxiosError): IterableIterator<any> {
    if (error.response && error.response.status === 401) {
      const errors = {
        password: "Invalid email/password combination",
      };
      yield call(action.payload.setErrors, errors);
    } else {
      yield* handleFormErrors(action, error);
    }
  },
  url: "/api/login",
});

export const logoutSaga = createServiceSaga({
  actionCreator: actionCreators.logout,
  method: "POST",
  *onSuccess(): IterableIterator<any> {
    yield put(push("/login"));
  },
  url: "/api/logout",
});

export const resetPasswordSaga = createServiceSaga({
  actionCreator: actionCreators.resetPassword,
  extractDataFromAction: action => action.payload.data,
  extractHeadersFromAction: (action): Record<string, string> => ({
    Authorization: `Bearer ${action.payload.token}`,
  }),
  method: "POST",
  *onError(action: FormikAction<ResetPassword>, error: AxiosError): IterableIterator<any> {
    if (error.response && error.response.status === 401) {
      const errors = {
        password: "This URL is expired.",
      };
      yield call(action.payload.setErrors, errors);
    } else {
      yield* handleFormErrors(action, error);
    }
  },
  url: "/api/change-password",
});

export const signUpSaga = createFormikSubmitSaga(actionCreators.signUp, "/api/sign-up");

export default [loginSaga(), logoutSaga(), forgotPasswordSaga(), resetPasswordSaga(), signUpSaga()];

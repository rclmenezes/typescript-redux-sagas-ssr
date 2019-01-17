import { AxiosError } from "axios";
import { call } from "redux-saga/effects";
import { Action, AsyncActionCreators } from "typescript-fsa";

import { FormikPayload } from "../../actions/utils";
import { createServiceSaga, POST } from "./serviceSaga";

export { FormikPayload };

export type FormikAction<P> = Action<FormikPayload<P>>;
export type FormikAsyncActionCreator<P, S, E> = AsyncActionCreators<FormikPayload<P>, S, E>;

export function* handleFormErrors<P>(action: FormikAction<P>, error: AxiosError) {
  if (error.response && error.response.status === 400 && error.response.data) {
    yield call(action.payload.setErrors, error.response.data);
  }
}

export function createFormikSubmitSaga<P, S, E>(
  actionCreator: FormikAsyncActionCreator<P, S, E>,
  url: string,
  extractHeadersFromAction: ((action: FormikAction<P>) => {}) | null = null,
) {
  return createServiceSaga({
    actionCreator,
    extractDataFromAction: action => action.payload.data,
    extractHeadersFromAction,
    method: POST,
    onError: handleFormErrors,
    url,
  });
}

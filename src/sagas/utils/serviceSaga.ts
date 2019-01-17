import axios, { AxiosError, AxiosInstance } from "axios";
import { SagaIterator } from "redux-saga";
import { call, put, takeLatest } from "redux-saga/effects";
import { Action, AsyncActionCreators } from "typescript-fsa";

import { IS_CLIENT, PORT } from "../../settings";

let axiosInstance: AxiosInstance;
if (IS_CLIENT) {
  axiosInstance = axios.create();
} else {
  axiosInstance = axios.create({
    baseURL: `http://localhost:${PORT}`,
  });
}

export type Get = "GET";
export type Post = "POST";
export type MethodTypes = Get | Post;
export const GET: Get = "GET";
export const POST: Post = "POST";

export function createService<Data, Return>(url: string, method: MethodTypes) {
  return async (data: Data, headers: Record<string, string> | null) => {
    const res = await axiosInstance.request({
      data,
      headers,
      method,
      url,
    });
    return res.data as Return;
  };
}

export function createServiceSaga<P, S, E, D>(options: {
  actionCreator: AsyncActionCreators<P, S, E>;
  extractDataFromAction?: (action: Action<P>) => D;
  extractHeadersFromAction?: ((action: Action<P>) => Record<string, string>) | null;
  onError?: (action: Action<P>, e: AxiosError) => SagaIterator;
  onSuccess?: (action: Action<P>, result: S) => SagaIterator;
  method?: MethodTypes;
  url: string;
}) {
  const defaultOptions = {
    extractDataFromAction: (action: Action<P>) => (action.payload as unknown) as D,
    extractHeadersFromAction: null,
    method: GET,
  };
  const {
    actionCreator,
    extractDataFromAction,
    extractHeadersFromAction,
    onError,
    onSuccess,
    method,
    url,
  } = {
    ...defaultOptions,
    ...options,
  };

  const service = createService(url, method);

  const saga = function*(action: Action<P>) {
    const data = extractDataFromAction(action);
    const headers = extractHeadersFromAction ? extractHeadersFromAction(action) : null;
    try {
      const result: S = yield call(service, data, headers);
      yield put(
        actionCreator.done(
          {
            params: action.payload,
            result,
          },
          action.meta,
        ),
      );
      if (onSuccess) {
        yield* onSuccess(action, result);
      }
    } catch (err) {
      yield put(
        actionCreator.failed(
          {
            error: err,
            params: action.payload,
          },
          action.meta,
        ),
      );
      if (onError) {
        yield* onError(action, err);
      }
    }
  };
  return function*() {
    yield takeLatest<Action<P>>(actionCreator.started.type, saga);
  };
}

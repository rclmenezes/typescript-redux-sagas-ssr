import axios, { AxiosInstance } from "axios";
import { match as Match } from "react-router";
import { call, put, takeLatest } from "redux-saga/effects";
import { Action, AsyncActionCreators } from "typescript-fsa";

import { IS_CLIENT, PORT } from "../settings";

let axiosInstance: AxiosInstance;
if (IS_CLIENT) {
  axiosInstance = axios.create();
} else {
  axiosInstance = axios.create({
    baseURL: `http://localhost:${PORT}`,
  });
}

function createService<Data, Return>(url: string, method: string) {
  return async (data: Data) => {
    const res = await axiosInstance.request({
      data,
      method,
      url,
    });
    return res.data as Return;
  };
}

function createServiceSaga<P, S, E, D>(
  actionCreator: AsyncActionCreators<P, S, E>,
  service: (params: D) => Promise<S>,
  extractDataFromAction: (action: Action<P>) => D,
) {
  return function*(action: Action<P>) {
    const data = extractDataFromAction(action);
    try {
      const result = yield call(service, data);
      yield put(
        actionCreator.done(
          {
            params: action.payload,
            result,
          },
          action.meta,
        ),
      );
      return result;
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
      throw err as E;
    }
  };
}

function createSafeSaga<P>(saga: (action: Action<P>) => IterableIterator<any>) {
  return function*(action: Action<P>) {
    try {
      yield* saga(action);
    } catch (error) {
      // Ignore errors!
    }
  };
}

function pageLoadSaga<MatchParams, ServiceResponse, E>(
  actionCreator: AsyncActionCreators<MatchParams, ServiceResponse, E>,
  url: string,
) {
  const service = createService<MatchParams, ServiceResponse>(url, "GET");
  const serviceSaga = createServiceSaga(
    actionCreator,
    service,
    (action: Action<MatchParams>) => action.payload,
  );
  const safeSaga = createSafeSaga(serviceSaga);

  return takeLatest<Action<MatchParams>>(actionCreator.started.type, safeSaga);
}

export default pageLoadSaga;

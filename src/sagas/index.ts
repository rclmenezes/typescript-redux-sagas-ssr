import { all } from "redux-saga/effects";

import authSagas from "./auth";

// const pageLoadSagas = [pageLoadSaga(actionCreators.login, "/api/test")];

export default function* rootSaga() {
  yield all([...authSagas]);
}

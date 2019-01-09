import { all } from "redux-saga/effects";

import actionCreators from "../actions";
import pageLoadSaga from "./pageLoadSaga";

const pageLoadSagas = [pageLoadSaga(actionCreators.apiTest, "/api/test")];

export default function* rootSaga() {
  yield all([...pageLoadSagas]);
}

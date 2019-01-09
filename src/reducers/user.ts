import { reducerWithInitialState } from "typescript-fsa-reducers";

import actionCreators from "../actions";

export type UserState = {
  name: string;
} | null;

export const user = reducerWithInitialState<UserState>(null).cases(
  [actionCreators.apiTest.done],
  (state, payload) => {
    return payload.result;
  },
);

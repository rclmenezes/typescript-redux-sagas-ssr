import { reducerWithInitialState } from "typescript-fsa-reducers";

import actionCreators from "../actions";

export interface User {
  id: number;
  email: string;
}

export type UserState = User | null;

export const user = reducerWithInitialState<UserState>(null)
  .cases(
    [actionCreators.login.done, actionCreators.resetPassword.done, actionCreators.signUp.done],
    (state, payload) => {
      return payload.result;
    },
  )
  .cases([actionCreators.logout.done], (state, payload) => {
    return null;
  });

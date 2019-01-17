import { reducerWithInitialState } from "typescript-fsa-reducers";

import actionCreators from "../actions";

export const resetPasswordSuccess = reducerWithInitialState<boolean>(false)
  .cases([actionCreators.initResetPassword], (state, payload) => {
    return false;
  })
  .cases([actionCreators.resetPassword.done], (state, payload) => {
    return true;
  });

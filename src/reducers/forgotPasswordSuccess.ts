import { reducerWithInitialState } from "typescript-fsa-reducers";

import actionCreators from "../actions";

export const forgotPasswordSuccess = reducerWithInitialState<boolean>(false)
  .cases([actionCreators.initForgotPassword], (state, payload) => {
    return false;
  })
  .cases([actionCreators.forgotPassword.done], (state, payload) => {
    return true;
  });

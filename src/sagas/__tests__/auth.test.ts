import { AxiosError } from "axios";
import { push } from "connected-react-router";
import { call, put, takeLatest } from "redux-saga/effects";

import actionCreators from "../../actions";
import { forgotPasswordSaga, loginSaga, logoutSaga, resetPasswordSaga, signUpSaga } from "../auth";

const MOCK_LOGIN_DATA = {
  email: "sdfsdf",
  password: "newpassword",
};

const MOCK_SET_ERRORS = (d: any) => null;

const MOCK_USER = {
  email: "test",
  id: 1,
};

const MOCK_AXIOS_ERROR = ((): AxiosError => {
  const err: any = new Error("Test");
  err.config = {};
  err.code = {};
  err.request = {};
  err.response = {
    data: {},
    status: 400,
  };
  err.isAxiosError = true;
  return err;
})();

describe("Testing login", () => {
  const MOCK_LOGIN_PAYLOAD = {
    data: MOCK_LOGIN_DATA,
    setErrors: MOCK_SET_ERRORS,
  };
  test("Test success", () => {
    const first = loginSaga().next().value;
    const saga = first.FORK.args[1];
    expect(first).toEqual(takeLatest(actionCreators.login.started.type, saga));

    const initAction = actionCreators.login.started(MOCK_LOGIN_PAYLOAD);
    const gen = saga(initAction);

    const serviceCall = gen.next().value;
    const service = serviceCall.CALL.fn;
    expect(serviceCall).toEqual(call(service, initAction.payload.data, null));

    const putSuccess = gen.next(MOCK_USER).value;
    expect(putSuccess).toEqual(
      put(actionCreators.login.done({ params: MOCK_LOGIN_PAYLOAD, result: MOCK_USER })),
    );

    const done = gen.next();
    expect(done.done).toBe(true);
  });

  test("Test failure", () => {
    const first = loginSaga().next().value;
    const saga = first.FORK.args[1];
    expect(first).toEqual(takeLatest(actionCreators.login.started.type, saga));

    const initAction = actionCreators.login.started(MOCK_LOGIN_PAYLOAD);
    const gen = saga(initAction);

    const serviceCall = gen.next().value;
    const service = serviceCall.CALL.fn;
    expect(serviceCall).toEqual(call(service, initAction.payload.data, null));

    const putFailure = gen.throw(MOCK_AXIOS_ERROR).value;
    expect(putFailure).toEqual(
      put(actionCreators.login.failed({ params: MOCK_LOGIN_PAYLOAD, error: MOCK_AXIOS_ERROR })),
    );

    const rejectCall = gen.next().value;
    expect(rejectCall).toEqual(call(MOCK_SET_ERRORS, MOCK_AXIOS_ERROR.response!.data));

    const done = gen.next();
    expect(done.done).toBe(true);
  });
});

describe("Testing signup", () => {
  const MOCK_SIGNUP_PAYLOAD = {
    data: MOCK_LOGIN_DATA,
    setErrors: MOCK_SET_ERRORS,
  };
  test("Test success", () => {
    const first = signUpSaga().next().value;
    const saga = first.FORK.args[1];
    expect(first).toEqual(takeLatest(actionCreators.signUp.started.type, saga));

    const initAction = actionCreators.signUp.started(MOCK_SIGNUP_PAYLOAD);
    const gen = saga(initAction);

    const serviceCall = gen.next().value;
    const service = serviceCall.CALL.fn;
    expect(serviceCall).toEqual(call(service, initAction.payload.data, null));

    const putSuccess = gen.next(MOCK_USER).value;
    expect(putSuccess).toEqual(
      put(actionCreators.signUp.done({ params: MOCK_SIGNUP_PAYLOAD, result: MOCK_USER })),
    );

    const done = gen.next();
    expect(done.done).toBe(true);
  });

  test("Test failure", () => {
    const first = signUpSaga().next().value;
    const saga = first.FORK.args[1];
    expect(first).toEqual(takeLatest(actionCreators.signUp.started.type, saga));

    const initAction = actionCreators.signUp.started(MOCK_SIGNUP_PAYLOAD);
    const gen = saga(initAction);

    const serviceCall = gen.next().value;
    const service = serviceCall.CALL.fn;
    expect(serviceCall).toEqual(call(service, initAction.payload.data, null));

    const putFailure = gen.throw(MOCK_AXIOS_ERROR).value;
    expect(putFailure).toEqual(
      put(actionCreators.signUp.failed({ params: MOCK_SIGNUP_PAYLOAD, error: MOCK_AXIOS_ERROR })),
    );

    const rejectCall = gen.next().value;
    expect(rejectCall).toEqual(call(MOCK_SET_ERRORS, MOCK_AXIOS_ERROR.response!.data));

    const done = gen.next();
    expect(done.done).toBe(true);
  });
});

describe("Testing forgot password", () => {
  const MOCK_FORGET_PASSWORD_PAYLOAD = {
    data: {
      email: "sdfsdf",
    },
    setErrors: MOCK_SET_ERRORS,
  };
  test("Test success", () => {
    const first = forgotPasswordSaga().next().value;
    const saga = first.FORK.args[1];
    expect(first).toEqual(takeLatest(actionCreators.forgotPassword.started.type, saga));

    const initAction = actionCreators.forgotPassword.started(MOCK_FORGET_PASSWORD_PAYLOAD);
    const gen = saga(initAction);

    const serviceCall = gen.next().value;
    const service = serviceCall.CALL.fn;
    expect(serviceCall).toEqual(call(service, initAction.payload.data, null));

    const putSuccess = gen.next(MOCK_USER).value;
    expect(putSuccess).toEqual(
      put(
        actionCreators.forgotPassword.done({
          params: MOCK_FORGET_PASSWORD_PAYLOAD,
          result: MOCK_USER,
        }),
      ),
    );

    const done = gen.next();
    expect(done.done).toBe(true);
  });

  test("Test failure", () => {
    const first = forgotPasswordSaga().next().value;
    const saga = first.FORK.args[1];
    expect(first).toEqual(takeLatest(actionCreators.forgotPassword.started.type, saga));

    const initAction = actionCreators.forgotPassword.started(MOCK_FORGET_PASSWORD_PAYLOAD);
    const gen = saga(initAction);

    const serviceCall = gen.next().value;
    const service = serviceCall.CALL.fn;
    expect(serviceCall).toEqual(call(service, initAction.payload.data, null));

    const putFailure = gen.throw(MOCK_AXIOS_ERROR).value;
    expect(putFailure).toEqual(
      put(
        actionCreators.forgotPassword.failed({
          error: MOCK_AXIOS_ERROR,
          params: MOCK_FORGET_PASSWORD_PAYLOAD,
        }),
      ),
    );

    const rejectCall = gen.next().value;
    expect(rejectCall).toEqual(call(MOCK_SET_ERRORS, MOCK_AXIOS_ERROR.response!.data));

    const done = gen.next();
    expect(done.done).toBe(true);
  });
});

describe("Testing logout", () => {
  test("Test success", () => {
    const first = logoutSaga().next().value;
    const saga = first.FORK.args[1];
    expect(first).toEqual(takeLatest(actionCreators.logout.started.type, saga));

    const initAction = actionCreators.logout.started();
    const gen = saga(initAction);

    const serviceCall = gen.next().value;
    const service = serviceCall.CALL.fn;
    expect(serviceCall).toEqual(call(service, initAction.payload, null));

    const putSuccess = gen.next({}).value;
    expect(putSuccess).toEqual(
      put(
        actionCreators.logout.done({
          params: undefined,
          result: {},
        }),
      ),
    );

    const putPush = gen.next().value;
    expect(putPush).toEqual(put(push("/login")));

    const done = gen.next();
    expect(done.done).toBe(true);
  });

  test("Test failure", () => {
    const first = logoutSaga().next().value;
    const saga = first.FORK.args[1];
    expect(first).toEqual(takeLatest(actionCreators.logout.started.type, saga));

    const initAction = actionCreators.logout.started();
    const gen = saga(initAction);

    const serviceCall = gen.next().value;
    const service = serviceCall.CALL.fn;
    expect(serviceCall).toEqual(call(service, initAction.payload, null));

    const putFailure = gen.throw(MOCK_AXIOS_ERROR).value;
    expect(putFailure).toEqual(
      put(
        actionCreators.logout.failed({
          error: MOCK_AXIOS_ERROR,
          params: undefined,
        }),
      ),
    );

    const done = gen.next();
    expect(done.done).toBe(true);
  });
});

describe("Testing reset password", () => {
  const MOCK_TOKEN = "asdfasf";
  const MOCK_RESET_PASSWORD_PAYLOAD = {
    data: {
      password: "sdfsdf",
    },
    setErrors: MOCK_SET_ERRORS,
    token: MOCK_TOKEN,
  };

  test("Test success", () => {
    const first = resetPasswordSaga().next().value;
    const saga = first.FORK.args[1];
    expect(first).toEqual(takeLatest(actionCreators.resetPassword.started.type, saga));

    const initAction = actionCreators.resetPassword.started(MOCK_RESET_PASSWORD_PAYLOAD);
    const gen = saga(initAction);

    const serviceCall = gen.next().value;
    const service = serviceCall.CALL.fn;
    expect(serviceCall).toEqual(
      call(service, initAction.payload.data, { Authorization: `Bearer ${MOCK_TOKEN}` }),
    );

    const putSuccess = gen.next(MOCK_USER).value;
    expect(putSuccess).toEqual(
      put(
        actionCreators.resetPassword.done({
          params: MOCK_RESET_PASSWORD_PAYLOAD,
          result: MOCK_USER,
        }),
      ),
    );

    const done = gen.next();
    expect(done.done).toBe(true);
  });

  test("Test failure", () => {
    const first = resetPasswordSaga().next().value;
    const saga = first.FORK.args[1];
    expect(first).toEqual(takeLatest(actionCreators.resetPassword.started.type, saga));

    const initAction = actionCreators.resetPassword.started(MOCK_RESET_PASSWORD_PAYLOAD);
    const gen = saga(initAction);

    const serviceCall = gen.next().value;
    const service = serviceCall.CALL.fn;
    expect(serviceCall).toEqual(
      call(service, initAction.payload.data, { Authorization: `Bearer ${MOCK_TOKEN}` }),
    );

    const putFailure = gen.throw(MOCK_AXIOS_ERROR).value;
    expect(putFailure).toEqual(
      put(
        actionCreators.resetPassword.failed({
          error: MOCK_AXIOS_ERROR,
          params: MOCK_RESET_PASSWORD_PAYLOAD,
        }),
      ),
    );

    const rejectCall = gen.next().value;
    expect(rejectCall).toEqual(call(MOCK_SET_ERRORS, MOCK_AXIOS_ERROR.response!.data));

    const done = gen.next();
    expect(done.done).toBe(true);
  });
});

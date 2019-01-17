import actionCreators from "../../actions";
import { user as reducer } from "../user";

const EXAMPLE_USER = {
  email: "hi",
  id: 1,
};

test("Initial state is null", () => {
  const action = {
    type: "something",
  };
  expect(reducer(undefined, action)).toEqual(null);
});

test("Login sets user", () => {
  const action = {
    payload: {
      result: EXAMPLE_USER,
    },
    type: actionCreators.login.done.type,
  };
  expect(reducer(undefined, action)).toEqual(EXAMPLE_USER);
});

test("Sign up sets user", () => {
  const action = {
    payload: {
      result: EXAMPLE_USER,
    },
    type: actionCreators.signUp.done.type,
  };
  expect(reducer(undefined, action)).toEqual(EXAMPLE_USER);
});

test("Reset Password sets user", () => {
  const action = {
    payload: {
      result: EXAMPLE_USER,
    },
    type: actionCreators.resetPassword.done.type,
  };
  expect(reducer(undefined, action)).toEqual(EXAMPLE_USER);
});

test("Logout removes user", () => {
  const action = {
    payload: {},
    type: actionCreators.logout.done.type,
  };
  expect(reducer(EXAMPLE_USER, action)).toEqual(null);
});

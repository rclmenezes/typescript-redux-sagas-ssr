import { showErrorPage as reducer } from "../showErrorPage";

test("Initial state is false", () => {
  expect(
    reducer(undefined, {
      payload: {},
      type: "BLAH",
    }),
  ).toEqual(false);
});

test("Any failed state with an Axios 500 makes this false", () => {
  expect(
    reducer(undefined, {
      payload: {
        error: {
          response: 500,
        },
      },
      type: "SOMETHINGSOMETHING/FAILED",
    }),
  ).toEqual(true);
});

test("Failing and succeeding makes it fine", () => {
  expect(
    reducer(undefined, {
      payload: {
        error: {
          response: 500,
        },
      },
      type: "SOMETHINGSOMETHING/FAILED",
    }),
  ).toEqual(true);

  expect(
    reducer(undefined, {
      payload: {},
      type: "SUCCESSFULTHINGY",
    }),
  ).toEqual(false);
});

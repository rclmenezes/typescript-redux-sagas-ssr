import { mount } from "enzyme";
import toJson from "enzyme-to-json";
import React from "react";
import { MemoryRouter } from "react-router";

import { createMockRouterProps } from "../../../utils/testing";
import SignUp, { SignUpProps } from "../../auth/SignUp";

describe("Test SignUp", () => {
  const routing = createMockRouterProps({});
  const MOCK_SIGNUP = {
    email: "email@email.com",
    password: "12341234",
  };

  const setup = (propOverrides: Partial<SignUpProps> = {}) => {
    const signUpSubmit = jest.fn();

    const props = {
      routing,
      signUpSubmit,
      user: null,
      ...propOverrides,
    };

    const wrapper = mount(
      <MemoryRouter>
        <SignUp {...props} />
      </MemoryRouter>,
    );

    return {
      getEmailField: () => wrapper.find('FieldInner[name="email"]'),
      getFormProps: () => wrapper.find("InnerSignUpForm").props() as any,
      getPasswordField: () => wrapper.find('FieldInner[name="password"]'),
      props,
      setEmailInput: (email: string) =>
        wrapper.find('input[name="email"]').simulate("change", {
          persist: () => {},
          target: {
            name: "email",
            value: email,
          },
        }),
      setPasswordInput: (password: string) =>
        wrapper.find('input[name="password"]').simulate("change", {
          persist: () => {},
          target: {
            name: "password",
            value: password,
          },
        }),
      signUpSubmit,
      wrapper,
    };
  };

  test("Submit successfully", async () => {
    const { getFormProps, setEmailInput, signUpSubmit, setPasswordInput, wrapper } = setup();
    expect(toJson(wrapper.find(SignUp) as any)).toMatchSnapshot();

    setEmailInput(MOCK_SIGNUP.email);
    setPasswordInput(MOCK_SIGNUP.password);

    let formikProps = getFormProps();
    await formikProps.submitForm();
    wrapper.update();
    formikProps = getFormProps();

    expect(formikProps.isSubmitting).toBe(true);
    expect(formikProps.isValid).toBe(true);
    expect(signUpSubmit.mock.calls.length).toBe(1);

    expect(signUpSubmit.mock.calls[0][0].data).toEqual(MOCK_SIGNUP);
  });

  test("setErrors gets called", async () => {
    const {
      getFormProps,
      getPasswordField,
      setEmailInput,
      signUpSubmit,
      setPasswordInput,
      wrapper,
    } = setup();

    setEmailInput(MOCK_SIGNUP.email);
    setPasswordInput(MOCK_SIGNUP.password);

    let formikProps = getFormProps();
    await formikProps.submitForm();
    wrapper.update();
    formikProps = getFormProps();

    expect(formikProps.isSubmitting).toBe(true);
    expect(formikProps.isValid).toBe(true);
    expect(signUpSubmit.mock.calls.length).toBe(1);

    expect(signUpSubmit.mock.calls[0][0].data).toEqual(MOCK_SIGNUP);

    const passwordError = "badness";
    signUpSubmit.mock.calls[0][0].setErrors({ password: passwordError });
    expect(getPasswordField().text()).toBe(passwordError);
  });

  test("Test submit without input", async () => {
    const { getFormProps, getEmailField, getPasswordField, wrapper } = setup();

    let formikProps = getFormProps();
    await formikProps.submitForm();
    wrapper.update();

    formikProps = getFormProps();
    expect(formikProps.errors.email).toBeTruthy();
    expect(getEmailField().text()).toBe(formikProps.errors.email);
    expect(formikProps.errors.password).toBeTruthy();
    expect(getPasswordField().text()).toBe(formikProps.errors.password);
  });

  test("Test submit without password", async () => {
    const { setEmailInput, getFormProps, getPasswordField, wrapper } = setup();

    setEmailInput(MOCK_SIGNUP.email);

    let formikProps = getFormProps();
    await formikProps.submitForm();
    wrapper.update();

    formikProps = getFormProps();
    expect(formikProps.errors.password).toBeTruthy();
    expect(getPasswordField().text()).toBe(formikProps.errors.password);
  });

  test("Test submit with short password", async () => {
    const { setEmailInput, getFormProps, getPasswordField, setPasswordInput, wrapper } = setup();

    setEmailInput("test");
    setPasswordInput("1234567");

    let formikProps = getFormProps();
    await formikProps.submitForm();
    wrapper.update();

    formikProps = getFormProps();
    expect(formikProps.errors.password).toBeTruthy();
    expect(getPasswordField().text()).toBe(formikProps.errors.password);
  });
});

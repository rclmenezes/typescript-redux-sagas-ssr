import { mount } from "enzyme";
import toJson from "enzyme-to-json";
import React from "react";
import { MemoryRouter } from "react-router";

import { createMockRouterProps } from "../../../utils/testing";
import Login, { LoginProps } from "../../auth/Login";

describe("Test Login", () => {
  const routing = createMockRouterProps({});
  const MOCK_LOGIN = {
    email: "email@email.com",
    password: "12341234",
  };

  const setup = (propOverrides: Partial<LoginProps> = {}) => {
    const loginSubmit = jest.fn();

    const props = {
      loginSubmit,
      routing,
      user: null,
      ...propOverrides,
    };

    const wrapper = mount(
      <MemoryRouter>
        <Login {...props} />
      </MemoryRouter>,
    );

    return {
      getEmailField: () => wrapper.find('FieldInner[name="email"]'),
      getFormProps: () => wrapper.find("InnerLoginForm").props() as any,
      getPasswordField: () => wrapper.find('FieldInner[name="password"]'),
      loginSubmit,
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
      wrapper,
    };
  };

  test("Submit successfully", async () => {
    const { getFormProps, setEmailInput, loginSubmit, setPasswordInput, wrapper } = setup();
    expect(toJson(wrapper.find(Login) as any)).toMatchSnapshot();

    setEmailInput(MOCK_LOGIN.email);
    setPasswordInput(MOCK_LOGIN.password);

    let formikProps = getFormProps();
    await formikProps.submitForm();
    wrapper.update();
    formikProps = getFormProps();

    expect(formikProps.isSubmitting).toBe(true);
    expect(formikProps.isValid).toBe(true);
    expect(loginSubmit.mock.calls.length).toBe(1);

    expect(loginSubmit.mock.calls[0][0].data).toEqual(MOCK_LOGIN);
  });

  test("setErrors gets called", async () => {
    const {
      getFormProps,
      getPasswordField,
      setEmailInput,
      loginSubmit,
      setPasswordInput,
      wrapper,
    } = setup();

    setEmailInput(MOCK_LOGIN.email);
    setPasswordInput(MOCK_LOGIN.password);

    let formikProps = getFormProps();
    await formikProps.submitForm();
    wrapper.update();
    formikProps = getFormProps();

    expect(formikProps.isSubmitting).toBe(true);
    expect(formikProps.isValid).toBe(true);
    expect(loginSubmit.mock.calls.length).toBe(1);

    expect(loginSubmit.mock.calls[0][0].data).toEqual(MOCK_LOGIN);

    const passwordError = "badness";
    loginSubmit.mock.calls[0][0].setErrors({ password: passwordError });
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

    setEmailInput(MOCK_LOGIN.email);

    let formikProps = getFormProps();
    await formikProps.submitForm();
    wrapper.update();

    formikProps = getFormProps();
    expect(formikProps.errors.password).toBeTruthy();
    expect(getPasswordField().text()).toBe(formikProps.errors.password);
  });
});

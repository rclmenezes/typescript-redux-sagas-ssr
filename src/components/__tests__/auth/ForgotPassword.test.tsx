import { mount } from "enzyme";
import toJson from "enzyme-to-json";
import React from "react";
import { MemoryRouter } from "react-router";

import { createMockRouterProps } from "../../../utils/testing";
import ForgotPassword, { ForgotPasswordProps } from "../../auth/ForgotPassword";

describe("Test ForgotPassword", () => {
  const routing = createMockRouterProps({});
  const MOCK_FORGOT_PASSWORD = {
    email: "email@email.com",
  };

  const setup = (propOverrides: Partial<ForgotPasswordProps> = {}) => {
    const forgotPasswordSubmit = jest.fn();

    const props = {
      forgotPasswordSubmit,
      routing,
      showConfirmation: false,
      user: null,
      ...propOverrides,
    };

    const wrapper = mount(
      <MemoryRouter>
        <ForgotPassword {...props} />
      </MemoryRouter>,
    );

    return {
      forgotPasswordSubmit,
      getFormProps: () => wrapper.find("InnerForgotPasswordForm").props() as any,
      getPasswordField: () => wrapper.find('FieldInner[name="email"]'),
      setPasswordInput: (email: string) =>
        wrapper.find('input[name="email"]').simulate("change", {
          persist: () => {},
          target: {
            name: "email",
            value: email,
          },
        }),
      wrapper,
    };
  };

  test("Submit successfully", async () => {
    const { getFormProps, forgotPasswordSubmit, setPasswordInput, wrapper } = setup();
    expect(toJson(wrapper.find(ForgotPassword) as any)).toMatchSnapshot();

    setPasswordInput(MOCK_FORGOT_PASSWORD.email);

    let formikProps = getFormProps();
    await formikProps.submitForm();
    wrapper.update();
    formikProps = getFormProps();

    expect(formikProps.isSubmitting).toBe(true);
    expect(formikProps.isValid).toBe(true);
    expect(forgotPasswordSubmit.mock.calls.length).toBe(1);

    expect(forgotPasswordSubmit.mock.calls[0][0].data).toEqual(MOCK_FORGOT_PASSWORD);
  });

  test("setErrors gets called", async () => {
    const {
      getFormProps,
      getPasswordField,
      forgotPasswordSubmit,
      setPasswordInput,
      wrapper,
    } = setup();

    setPasswordInput(MOCK_FORGOT_PASSWORD.email);

    let formikProps = getFormProps();
    await formikProps.submitForm();
    wrapper.update();
    formikProps = getFormProps();

    expect(formikProps.isSubmitting).toBe(true);
    expect(formikProps.isValid).toBe(true);
    expect(forgotPasswordSubmit.mock.calls.length).toBe(1);

    expect(forgotPasswordSubmit.mock.calls[0][0].data).toEqual(MOCK_FORGOT_PASSWORD);

    const emailError = "Badness";
    forgotPasswordSubmit.mock.calls[0][0].setErrors({
      email: emailError,
    });
    expect(getPasswordField().text()).toBe(emailError);
  });

  test("Test submit without input", async () => {
    const { getFormProps, getPasswordField, wrapper } = setup();

    let formikProps = getFormProps();
    await formikProps.submitForm();
    wrapper.update();

    formikProps = getFormProps();
    expect(formikProps.errors.email).toBeTruthy();
    expect(getPasswordField().text()).toBe(formikProps.errors.email);
  });
});

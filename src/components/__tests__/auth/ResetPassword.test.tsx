import { mount } from "enzyme";
import toJson from "enzyme-to-json";
import { sign } from "jsonwebtoken";
import React from "react";
import { MemoryRouter } from "react-router";

import { createMockRouterProps } from "../../../utils/testing";
import ResetPassword, { ResetPasswordProps } from "../../auth/ResetPassword";

describe("Test ResetPassword", () => {
  const MOCK_RESET_PASSWORD = {
    password: "12341234",
  };
  const FAKE_USER_ID = 1;
  const MOCK_VALID_TOKEN = sign({ id: FAKE_USER_ID }, "FAKE SECRET", { expiresIn: "1d" });

  const setup = (propOverrides: Partial<ResetPasswordProps> = {}, search = "") => {
    const resetPasswordSubmit = jest.fn();
    const routing = createMockRouterProps({}, search);

    const props = {
      resetPasswordSubmit,
      routing,
      showConfirmation: false,
      user: null,
      ...propOverrides,
    };

    const wrapper = mount(
      <MemoryRouter>
        <ResetPassword {...props} />
      </MemoryRouter>,
    );

    return {
      getFormProps: () => wrapper.find("InnerResetPasswordForm").props() as any,
      getPasswordField: () => wrapper.find('FieldInner[name="password"]'),
      resetPasswordSubmit,
      routing,
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

  test("Show confirmation", async () => {
    const { routing, wrapper } = setup({ showConfirmation: true });

    expect(routing.staticContext!.status).toBe(200);
    expect(wrapper.text()).toEqual(expect.stringContaining("Success"));
    expect(toJson(wrapper.find("BaseAuthPage") as any)).toMatchSnapshot();
  });

  test("Missing token", async () => {
    const { routing, wrapper } = setup();

    expect(routing.staticContext!.status).toBe(400);
    expect(wrapper.text()).toEqual(expect.stringContaining("Invalid"));
    expect(toJson(wrapper.find("BaseAuthPage") as any)).toMatchSnapshot();
  });

  test("Invalid token", async () => {
    const { routing, wrapper } = setup({}, "?token=invalidtoken");

    expect(routing.staticContext!.status).toBe(400);
    expect(wrapper.text()).toEqual(expect.stringContaining("Invalid"));
    expect(toJson(wrapper.find("BaseAuthPage") as any)).toMatchSnapshot();
  });

  test("Expired token", async () => {
    const token = sign({ id: FAKE_USER_ID }, "FAKE SECRET", { expiresIn: "-1d" });
    const { routing, wrapper } = setup({}, `?token=${token}`);

    expect(routing.staticContext!.status).toBe(400);
    expect(wrapper.text()).toEqual(expect.stringContaining("Expired"));
    expect(toJson(wrapper.find("BaseAuthPage") as any)).toMatchSnapshot();
  });

  test("Successful submit", async () => {
    const { getFormProps, resetPasswordSubmit, routing, setPasswordInput, wrapper } = setup(
      {},
      `?token=${MOCK_VALID_TOKEN}`,
    );

    expect(routing.staticContext!.status).toBe(200);
    expect(wrapper.text()).toEqual(expect.stringContaining("Change Your Password"));
    expect(toJson(wrapper.find("Form") as any)).toMatchSnapshot();

    setPasswordInput(MOCK_RESET_PASSWORD.password);

    let formikProps = getFormProps();
    await formikProps.submitForm();
    wrapper.update();
    formikProps = getFormProps();

    expect(formikProps.isSubmitting).toBe(true);
    expect(formikProps.isValid).toBe(true);
    expect(resetPasswordSubmit.mock.calls.length).toBe(1);
  });

  test("setErrors gets called", async () => {
    const {
      getFormProps,
      getPasswordField,
      resetPasswordSubmit,
      setPasswordInput,
      wrapper,
    } = setup({}, `?token=${MOCK_VALID_TOKEN}`);

    setPasswordInput(MOCK_RESET_PASSWORD.password);

    let formikProps = getFormProps();
    await formikProps.submitForm();
    wrapper.update();
    formikProps = getFormProps();

    expect(formikProps.isSubmitting).toBe(true);
    expect(formikProps.isValid).toBe(true);
    expect(resetPasswordSubmit.mock.calls.length).toBe(1);

    expect(resetPasswordSubmit.mock.calls[0][0].data).toEqual(MOCK_RESET_PASSWORD);

    const passwordError = "Badness";
    resetPasswordSubmit.mock.calls[0][0].setErrors({
      password: passwordError,
    });
    expect(getPasswordField().text()).toBe(passwordError);
  });

  test("Test submit without input", async () => {
    const { getFormProps, getPasswordField, wrapper } = setup({}, `?token=${MOCK_VALID_TOKEN}`);

    let formikProps = getFormProps();
    await formikProps.submitForm();
    wrapper.update();

    formikProps = getFormProps();
    expect(formikProps.errors.password).toBeTruthy();
    expect(getPasswordField().text()).toBe(formikProps.errors.password);
  });
});

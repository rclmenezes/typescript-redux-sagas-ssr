import { shallow } from "enzyme";
import React from "react";

import { createMockRouterProps } from "../../utils/testing";
import Navbar, { NavbarProps } from "../Navbar";

describe("Test Navbar", () => {
  const routing = createMockRouterProps({});
  const MOCK_LOGOUT_SUBMIT = () => {};
  const MOCK_USER = {
    email: "asdf",
    id: 1,
  };

  const setup = (propOverrides: Partial<NavbarProps> = {}) => {
    const props = {
      hideLogin: undefined,
      hideNavbar: undefined,
      logoutSubmit: MOCK_LOGOUT_SUBMIT,
      routing,
      user: null,
      ...propOverrides,
    };

    const wrapper = shallow(<Navbar {...props} />);
    return { props, wrapper };
  };

  test("Test default render", () => {
    const { wrapper } = setup();
    expect(wrapper.find('Link[children="Log In"]').exists()).toBe(true);
    expect(wrapper.prop("className")).toBeUndefined();
    expect(
      wrapper
        .find("MenuMenu")
        .first()
        .prop("className"),
    ).toBeUndefined();
    expect(wrapper).toMatchSnapshot();
  });

  test("Navbar renders logout with user", () => {
    const { wrapper } = setup({ user: MOCK_USER });
    expect(wrapper.find('a[children="Log Out"]').exists()).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });

  test("Navbar is invisible when hideNavbar=true", () => {
    const { wrapper } = setup({ hideNavbar: true });
    expect(wrapper.prop("className")).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  });

  test("Navbar is invisible when hideLogin=true", () => {
    const { wrapper } = setup({ hideLogin: true });
    expect(
      wrapper
        .find("MenuMenu")
        .first()
        .prop("className"),
    ).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  });
});

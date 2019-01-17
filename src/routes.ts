import { RouteProps } from "react-router";
import { ActionCreator } from "typescript-fsa";

import actionCreators from "./actions";
import Home from "./components/Home";
import Http404 from "./components/status/Http404";
import ForgotPassword from "./containers/auth/ForgotPassword";
import Login from "./containers/auth/Login";
import ResetPassword from "./containers/auth/ResetPassword";
import SignUp from "./containers/auth/SignUp";

export interface RouteArgs {
  action?: ActionCreator<any>;
  Component?: React.ComponentType<any>;
  description?: string;
  hideNavbar?: true;
  hideLogin?: true;
  PrivateComponent?: React.ComponentType<any>;
  PublicComponent?: React.ComponentType<any>;
  routeProps?: RouteProps;
  title: string;
}

const routes: RouteArgs[] = [
  {
    Component: Home,
    routeProps: {
      exact: true,
      path: "/",
    },
    title: "Home",
  },
  {
    PublicComponent: SignUp,
    hideLogin: true,
    routeProps: {
      exact: true,
      path: "/sign-up",
    },
    title: "Sign Up",
  },
  {
    PublicComponent: ForgotPassword,
    action: actionCreators.initForgotPassword,
    routeProps: {
      exact: true,
      path: "/forgot-password",
    },
    title: "Forgot Your Password?",
  },
  {
    PublicComponent: ResetPassword,
    action: actionCreators.initResetPassword,
    routeProps: {
      exact: true,
      path: "/reset-password",
    },
    title: "Reset Your Password",
  },
  {
    PublicComponent: Login,
    hideLogin: true,
    routeProps: {
      exact: true,
      path: "/login",
    },
    title: "Login",
  },
  {
    Component: Http404,
    description: "Sorry, your page was not found",
    title: "404 Not Found",
  },
];

export default routes;

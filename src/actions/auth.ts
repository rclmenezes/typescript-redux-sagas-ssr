import { AxiosError } from "axios";
import actionCreatorFactory from "typescript-fsa";

import { User } from "../reducers/user";
import { FormikPayload, FormikTokenPayload } from "./utils";

const factory = actionCreatorFactory("AUTH");

export interface Login {
  email: string;
  password: string;
}

export type SignUp = Login;

export interface ForgotPassword {
  email: string;
}

export interface ResetPassword {
  password: string;
}

export type LoginPayload = FormikPayload<Login>;
export type ForgotPasswordPayload = FormikPayload<ForgotPassword>;
export type SignUpPayload = FormikPayload<SignUp>;
export type ResetPasswordPayload = FormikTokenPayload<ResetPassword>;

export const actionCreators = {
  forgotPassword: factory.async<ForgotPasswordPayload, {}, AxiosError>("FORGET_PASSWORD"),
  initForgotPassword: factory("INIT_FORGOT_PASSWORD"),
  initResetPassword: factory("INIT_RESET_PASSWORD"),
  login: factory.async<LoginPayload, User, AxiosError>("LOGIN"),
  logout: factory.async<void, {}, AxiosError>("LOGOUT"),
  resetPassword: factory.async<ResetPasswordPayload, User, AxiosError>("RESET_PASSWORD"),
  signUp: factory.async<SignUpPayload, User, AxiosError>("SIGN_UP"),
};

export default actionCreators;

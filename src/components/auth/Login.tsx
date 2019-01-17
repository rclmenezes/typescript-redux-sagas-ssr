import * as csstips from "csstips";
import { Field, Form, FormikBag, FormikProps, withFormik } from "formik";
import * as React from "react";
import { Link } from "react-router-dom";
import { Button, Message } from "semantic-ui-react";
import { style } from "typestyle";
import * as Yup from "yup";

import { Login, LoginPayload } from "../../actions/auth";
import { UserState } from "../../reducers/user";
import { PageRoutingProps } from "../../utils/routing";
import InputField from "../common/Input";
import BaseAuthPage from "./BaseAuthPage";

export interface LoginProps {
  loginSubmit: (payload: LoginPayload) => void;
  routing: PageRoutingProps<{}>;
  user: UserState;
}

const InnerLoginForm: React.SFC<FormikProps<Login> & LoginProps> = () => (
  <Form>
    <Field name="email" component={InputField} placeholder="Email" fluid />
    <Field name="password" component={InputField} placeholder="Password" type="password" fluid />
    <Button type="submit" fluid primary>
      Submit
    </Button>
    <Message className={style(csstips.horizontallyCenterChildren)}>
      <Link to="/forgot-password">Forgot your password?</Link>
    </Message>
    <Message className={style(csstips.horizontallyCenterChildren)}>
      <Link to="/sign-up">Create an account</Link>
    </Message>
  </Form>
);

export const LoginForm = withFormik<LoginProps, Login>({
  handleSubmit: (values: Login, formikBag: FormikBag<LoginProps, Login>) => {
    formikBag.props.loginSubmit({
      data: values,
      setErrors: formikBag.setErrors,
    });
  },
  mapPropsToValues: () => {
    return {
      email: "",
      password: "",
    };
  },
  validationSchema: Yup.object().shape({
    email: Yup.string().required("Email is a required field"),
    password: Yup.string().required("Password is a required field"),
  }),
})(InnerLoginForm);

class LoginPage extends React.Component<LoginProps> {
  public render() {
    return (
      <BaseAuthPage title="Log In">
        <LoginForm {...this.props} />
      </BaseAuthPage>
    );
  }
}

export default LoginPage;

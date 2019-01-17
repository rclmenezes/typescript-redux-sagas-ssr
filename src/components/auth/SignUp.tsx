import * as csstips from "csstips";
import { Field, Form, FormikBag, FormikProps, withFormik } from "formik";
import * as React from "react";
import { Link } from "react-router-dom";
import { Button, Message } from "semantic-ui-react";
import { style } from "typestyle";
import * as Yup from "yup";

import { SignUp, SignUpPayload } from "../../actions/auth";
import { PageRoutingProps } from "../../utils/routing";
import InputField from "../common/Input";
import BaseAuthPage from "./BaseAuthPage";

export interface SignUpProps {
  routing: PageRoutingProps<{}>;
  signUpSubmit: (payload: SignUpPayload) => void;
}

const InnerSignUpForm: React.SFC<FormikProps<SignUp> & SignUpProps> = () => (
  <Form>
    <Field name="email" component={InputField} placeholder="Email" fluid />
    <Field name="password" component={InputField} placeholder="Password" type="password" fluid />
    <Button type="submit" fluid primary>
      Submit
    </Button>
    <Message className={style(csstips.horizontallyCenterChildren)}>
      <Link to="/login">Already have an account?</Link>
    </Message>
  </Form>
);

const SignUpForm = withFormik<SignUpProps, SignUp>({
  handleSubmit: (values: SignUp, formikBag: FormikBag<SignUpProps, SignUp>) => {
    formikBag.props.signUpSubmit({
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
    password: Yup.string()
      .required("Password is a required field")
      .min(8, "Password must be at least 8 characters long"),
  }),
})(InnerSignUpForm);

class SignUpPage extends React.Component<SignUpProps> {
  public render() {
    return (
      <BaseAuthPage title="Sign Up">
        <SignUpForm {...this.props} />
      </BaseAuthPage>
    );
  }
}

export default SignUpPage;

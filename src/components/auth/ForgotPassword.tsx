import * as csstips from "csstips";
import { Field, Form, FormikBag, FormikProps, withFormik } from "formik";
import * as React from "react";
import { Link } from "react-router-dom";
import { Button, Message } from "semantic-ui-react";
import { style } from "typestyle";
import * as Yup from "yup";

import { ForgotPassword, ForgotPasswordPayload } from "../../actions/auth";
import { UserState } from "../../reducers/user";
import { PageRoutingProps } from "../../utils/routing";
import InputField from "../common/Input";
import BaseAuthPage from "./BaseAuthPage";

export interface ForgotPasswordProps {
  forgotPasswordSubmit: (payload: ForgotPasswordPayload) => void;
  routing: PageRoutingProps<{}>;
  showConfirmation: boolean;
  user: UserState;
}

const InnerForgotPasswordForm: React.SFC<
  FormikProps<ForgotPassword> & ForgotPasswordProps
> = () => (
  <Form>
    <Field name="email" component={InputField} placeholder="Email" fluid />
    <Button type="submit" fluid primary>
      Submit
    </Button>
    <Message className={style(csstips.horizontallyCenterChildren)}>
      <Link to="/sign-up">Create an account</Link>
    </Message>
  </Form>
);

const ForgotPasswordForm = withFormik<ForgotPasswordProps, ForgotPassword>({
  handleSubmit: (
    values: ForgotPassword,
    formikBag: FormikBag<ForgotPasswordProps, ForgotPassword>,
  ) => {
    formikBag.props.forgotPasswordSubmit({
      data: values,
      setErrors: formikBag.setErrors,
    });
  },
  mapPropsToValues: () => {
    return {
      email: "",
    };
  },
  validationSchema: Yup.object().shape({
    email: Yup.string().required("Email is a required field"),
  }),
})(InnerForgotPasswordForm);

class ForgotPasswordPage extends React.Component<ForgotPasswordProps> {
  public render() {
    return this.props.showConfirmation ? (
      <BaseAuthPage title="Success">
        <Message className={style(csstips.horizontallyCenterChildren)}>
          We've sent you an email. Click on the URL there to reset your password.
        </Message>
      </BaseAuthPage>
    ) : (
      <BaseAuthPage title="Forgot Your Password?">
        <ForgotPasswordForm {...this.props} />
      </BaseAuthPage>
    );
  }
}

export default ForgotPasswordPage;

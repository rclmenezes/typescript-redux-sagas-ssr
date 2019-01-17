import * as csstips from "csstips";
import { Field, Form, FormikBag, FormikProps, withFormik } from "formik";
import { decode } from "jsonwebtoken";
import { parse } from "query-string";
import * as React from "react";
import { Link } from "react-router-dom";
import { Button, Message } from "semantic-ui-react";
import { style } from "typestyle";
import * as Yup from "yup";

import { ResetPassword, ResetPasswordPayload } from "../../actions/auth";
import { UserState } from "../../reducers/user";
import { BASE_URL } from "../../settings";
import { PageRoutingProps } from "../../utils/routing";
import InputField from "../common/Input";
import BaseAuthPage from "./BaseAuthPage";

export interface ResetPasswordProps {
  resetPasswordSubmit: (payload: ResetPasswordPayload) => void;
  routing: PageRoutingProps<{}>;
  showConfirmation: boolean;
  user: UserState;
}

interface ResetPasswordFormProps extends ResetPasswordProps {
  token: string;
}

const InnerResetPasswordForm: React.SFC<
  FormikProps<ResetPassword> & ResetPasswordFormProps
> = () => (
  <Form>
    <Field
      name="password"
      component={InputField}
      placeholder="New Password"
      type="password"
      fluid
    />
    <Button type="submit" fluid primary>
      Submit
    </Button>
    <Message className={style(csstips.horizontallyCenterChildren)}>
      <Link to="/sign-up">Create an account</Link>
    </Message>
  </Form>
);

const ResetPasswordForm = withFormik<ResetPasswordFormProps, ResetPassword>({
  handleSubmit: (
    values: ResetPassword,
    formikBag: FormikBag<ResetPasswordFormProps, ResetPassword>,
  ) => {
    formikBag.props.resetPasswordSubmit({
      data: values,
      setErrors: formikBag.setErrors,
      token: formikBag.props.token,
    });
  },
  mapPropsToValues: () => {
    return {
      password: "",
    };
  },
  validationSchema: Yup.object().shape({
    password: Yup.string()
      .min(8, "Password must be at least 8 characters long")
      .required("Password is a required field"),
  }),
})(InnerResetPasswordForm);

type EXPIRED = "EXPIRED";
type INVALID = "INVALID";
type UNKNOWN = "UNKNOWN";
type VALID = "VALID";
type TokenStates = UNKNOWN | EXPIRED | VALID | INVALID;
const EXPIRED: EXPIRED = "EXPIRED";
const INVALID: INVALID = "INVALID";
const UNKNOWN: UNKNOWN = "UNKNOWN";
const VALID: VALID = "VALID";

class ResetPasswordPage extends React.Component<ResetPasswordProps> {
  componentDidMount = () => {
    const queryParams = parse(this.props.routing.location.search);
    let token = null;
    let tokenState: TokenStates = UNKNOWN;
    if (queryParams.token) {
      token = queryParams.token instanceof Array ? queryParams.token[0] : queryParams.token;
      const jwt = decode(token);
      if (jwt && typeof jwt === "object") {
        const isExpired = new Date().getTime() / 1000 > jwt.exp;
        tokenState = isExpired ? EXPIRED : VALID;
      } else {
        tokenState = INVALID;
      }
    }
    this.setState({ token: queryParams.token ? token : null, tokenState });
  };

  getToken() {
    const queryParams = parse(this.props.routing.location.search);
    let token = null;
    let tokenState: TokenStates = UNKNOWN;
    if (queryParams.token) {
      token = queryParams.token instanceof Array ? queryParams.token[0] : queryParams.token;
      const jwt = decode(token);
      if (jwt && typeof jwt === "object") {
        const isExpired = new Date().getTime() / 1000 > jwt.exp;
        tokenState = isExpired ? EXPIRED : VALID;
      } else {
        tokenState = INVALID;
      }
    }
    return { token: queryParams.token ? token : null, tokenState };
  }

  public render() {
    if (this.props.showConfirmation) {
      return (
        <BaseAuthPage title="Success!">
          <Message className={style(csstips.horizontallyCenterChildren)}>
            We've reset your password. Click <Link to="/">here to go home.</Link>
          </Message>
        </BaseAuthPage>
      );
    }

    const { token, tokenState } = this.getToken();
    if (tokenState !== VALID) {
      // If loading the page from here, make it 400
      const { staticContext } = this.props.routing;
      if (staticContext) {
        staticContext.status = 400;
      }
    }

    if (tokenState === INVALID || tokenState === UNKNOWN) {
      return (
        <BaseAuthPage title="Invalid URL">
          <Message className={style(csstips.horizontallyCenterChildren)}>
            Something is wrong with this URL. If you need help resetting your password, contact
            support at <a href="mailto:support@{BASE_URL}">support@{BASE_URL}</a>.
          </Message>
        </BaseAuthPage>
      );
    } else if (tokenState === EXPIRED) {
      return (
        <BaseAuthPage title="Expired URL">
          <Message className={style(csstips.horizontallyCenterChildren)}>
            This URL is expired. <Link to="/forgot-password">Please go here</Link> to submit another
            password request.
          </Message>
        </BaseAuthPage>
      );
    } else if (tokenState === VALID) {
      return (
        <BaseAuthPage title="Change Your Password">
          <ResetPasswordForm {...this.props} token={token!} />
        </BaseAuthPage>
      );
    } else {
      throw new Error("Invalid tokenState");
    }
  }
}

export default ResetPasswordPage;

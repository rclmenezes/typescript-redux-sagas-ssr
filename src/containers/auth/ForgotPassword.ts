import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import actionCreators from "../../actions";
import ForgotPassword from "../../components/auth/ForgotPassword";
import { RootState } from "../../reducers";

const mapStateToProps = (state: RootState) => ({
  showConfirmation: state.forgotPasswordSuccess,
  user: state.user,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      forgotPasswordSubmit: actionCreators.forgotPassword.started,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ForgotPassword);

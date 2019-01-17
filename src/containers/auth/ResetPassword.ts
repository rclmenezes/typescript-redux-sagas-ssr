import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import actionCreators from "../../actions";
import ResetPassword from "../../components/auth/ResetPassword";
import { RootState } from "../../reducers";

const mapStateToProps = (state: RootState) => ({
  showConfirmation: state.resetPasswordSuccess,
  user: state.user,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      resetPasswordSubmit: actionCreators.resetPassword.started,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ResetPassword);

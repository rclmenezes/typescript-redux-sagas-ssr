import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import actionCreators from "../actions";
import Navbar from "../components/Navbar";
import { RootState } from "../reducers";

const mapStateToProps = (state: RootState) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      logoutSubmit: actionCreators.logout.started,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Navbar);

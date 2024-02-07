import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { handleSetReturnUrl } from "../actions/returnUrl";
import { useLocation } from "react-router-dom";

function LogInProtection({ children, authedUser, dispatch }) {
  const location = useLocation();
  if (!authedUser) {
    dispatch(handleSetReturnUrl(location.pathname));
    return <Navigate to="/login" />;
  }
  return children;
}

const mapStateToProps = ({ authedUser }) => {
  return {
    authedUser,
  };
};

export default connect(mapStateToProps)(LogInProtection);

import { Navigate } from "react-router-dom";
import { connect } from "react-redux";

function LogInProtection({ children, authedUser }) {
  if (!authedUser) {
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

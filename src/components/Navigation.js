import avatar from "../../src/assets/loginPage-logo.png";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleLogoutAuthedUser } from "../actions/authedUser";
import "./Navigation.css";

const Navigation = ({ authedUser, dispatch }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(handleLogoutAuthedUser());
    navigate("/login");
  };

  if (authedUser === null) {
    return <nav className="navigation"></nav>;
  }

  return (
    <nav className="navigation">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/leaderboard">Leaderboard</Link>
        </li>
        <li>
          <Link to="/add">New</Link>
        </li>
      </ul>

      <img
        src={authedUser.avatarURL ?? avatar}
        alt="user-avatar"
        className="user-avatar"
      />
      <span className="user-name">{authedUser.userName}</span>

      <button
        className="logout-button button"
        type="button"
        onClick={handleLogout}
        data-testid="logout-button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="16"
          width="16"
          viewBox="0 0 512 512"
        >
          <path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z" />
        </svg>
      </button>
    </nav>
  );
};

const mapStateToProps = ({ authedUser }) => {
  return {
    authedUser,
  };
};
export default connect(mapStateToProps)(Navigation);

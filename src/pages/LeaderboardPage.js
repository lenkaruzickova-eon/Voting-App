import { connect } from "react-redux";
import "./LeaderbordPage.css";
import avatar from "../../src/assets/loginPage-logo.png";

const LeaderboardPage = ({ users }) => {
  const sortedUsers = [...users].sort(
    (a, b) => Object.keys(b.answers).length - Object.keys(a.answers).length
  );

  return (
    <div className="leaderboard-page">
      <h1>Leaderboard</h1>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Users</th>
            <th>Answered</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user) => (
            <tr key={user.id}>
              <td>
                <div className="user-info">
                  <img
                    src={user.avatarURL ?? avatar}
                    alt="user avatar"
                    className="user-avatar"
                  />
                  <span>{user.name}</span>
                </div>
              </td>
              <td>{Object.keys(user.answers).length}</td>
              <td>{Object.keys(user.questions).length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = ({ users }) => {
  return {
    users: Object.values(users),
  };
};

export default connect(mapStateToProps)(LeaderboardPage);

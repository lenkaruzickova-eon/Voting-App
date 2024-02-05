import { connect } from "react-redux";
import Question from "../components/Question";
import "./DashboardPage.css";

const DashboardPage = ({ questions, questionsAnswered }) => {
  return (
    <div className="dashboard-page">
      <h1>Dashboard</h1>
      <h2>New questions</h2>
      <ul className="question-list ">
        {questions
          .filter((id) => !questionsAnswered.includes(id))
          .map((id) => (
            <li key={id}>
              <Question id={id} />
            </li>
          ))}
      </ul>

      <h2>Answered questions</h2>
      <ul className="question-list ">
        {questions
          .filter((id) => questionsAnswered.includes(id))
          .map((id) => (
            <li key={id}>
              <Question id={id} />
            </li>
          ))}
      </ul>
    </div>
  );
};

const mapStateToProps = ({ questions, users, authedUser }) => {
  if (authedUser === null) {
    return {
      questions: [],
      questionsAnswered: [],
      questionCreatedByUser: [],
    };
  }
  const user = users[authedUser.userName];

  return {
    questions: Object.keys(questions),
    questionsAnswered: Object.keys(user.answers),
  };
};

export default connect(mapStateToProps)(DashboardPage);

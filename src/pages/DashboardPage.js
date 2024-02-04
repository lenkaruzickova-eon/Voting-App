import { connect } from "react-redux";
import Question from "../components/Question";
import "./DashboardPage.css";

const DashboardPage = ({
  questions,
  questionsAnswered,
  questionCreatedByUser,
}) => {
  return (
    <div className="dashboard-page">
      <h1>Dashboard</h1>
      <h2>New questions</h2>
      <ul className="question-list ">
        {questions
          .filter(
            (id) =>
              !questionCreatedByUser.includes(id) &&
              !questionsAnswered.includes(id)
          )
          .map((id) => (
            <li key={id}>
              <Question id={id} />
            </li>
          ))}
      </ul>

      <h2>Answered questions</h2>
      <ul className="question-list ">
        {questions
          .filter((id) => !questionCreatedByUser.includes(id))
          .map((id) => (
            <li key={id}>
              <Question id={id} />
            </li>
          ))}
      </ul>

      <h2>Created questions</h2>
      <ul className="question-list ">
        {questionCreatedByUser.map((id) => (
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
    // to be used in case that in block of Answered questions shall be shown also questions created and answered by user
    questionsAnswered: Object.keys(user.answers),
    questionCreatedByUser: user.questions,
  };
};

export default connect(mapStateToProps)(DashboardPage);

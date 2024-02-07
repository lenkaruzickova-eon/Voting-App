import { connect } from "react-redux";
import { formatDate } from "../utils/helpers.js";
import { Link } from "react-router-dom";
import "./Questions.css";

const Question = (props) => {
  if (props.question === null) {
    return <p>This question doesn't exist.</p>;
  }

  const { author, timestamp } = props.question;
  return (
    <div className="question">
      <span>{author}</span>
      <span>{formatDate(timestamp)}</span>
      <Link
        to={`/question/${props.id}`}
        className="button"
        data-testid="question-button"
      >
        Show
      </Link>
    </div>
  );
};
const mapStateToProps = ({ authedUser, users, questions }, { id }) => {
  const question = questions[id];
  if (!question) {
    console.error("quesiton not found in Question component", id);
  }

  return {
    authedUser,
    id,
    question,
  };
};
export default connect(mapStateToProps)(Question);

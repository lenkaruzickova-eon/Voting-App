import { connect } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { handleSaveAnswer } from "../actions/questions";
import "./PoolPage.css";
import NotFoundPage from "./NotFoundPage";

const withRouter = (Component) => {
  const ComponentWithRouterProp = (props) => {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  };

  return ComponentWithRouterProp;
};

const PoolPage = ({
  dispatch,
  author,
  question,
  optionOne,
  optionTwo,
  optionOneVotes,
  optionTwoVotes,
  users,
  questionsAnswered,
}) => {
  if (!author || !question) {
    return <NotFoundPage />;
  }

  return (
    <div className="pool-page">
      <h1>Pool by {author.name}</h1>
      <img
        src={author.avatarURL}
        alt="user avatar"
        className="pool-author-avatar"
      />
      <h2>Would you rather</h2>
      {questionsAnswered.includes(question.id) ? (
        <AsweredPool
          dispatch={dispatch}
          optionOne={optionOne}
          optionTwo={optionTwo}
          author={author}
          optionOneVotes={optionOneVotes}
          optionTwoVotes={optionTwoVotes}
          users={users}
        />
      ) : (
        <UnasweredPool
          dispatch={dispatch}
          question={question}
          optionOne={optionOne}
          optionTwo={optionTwo}
          author={author}
        />
      )}
    </div>
  );
};

const UnasweredPool = ({ dispatch, question, optionOne, optionTwo }) => {
  function onOptionOne() {
    dispatch(handleSaveAnswer(question.id, 1));
  }
  function onOptionTwo() {
    dispatch(handleSaveAnswer(question.id, 2));
  }

  return (
    <>
      <div className="pool-options">
        <div className="pool-option">
          <div className="pool-option-text">{optionOne}</div>
          <button className="button" onClick={onOptionOne}>
            Click
          </button>
        </div>
        <div className="pool-option">
          <div className="pool-option-text">{optionTwo}</div>
          <button className="button" onClick={onOptionTwo}>
            Click
          </button>
        </div>
      </div>
    </>
  );
};

const AsweredPool = ({
  optionOne,
  optionTwo,
  optionOneVotes,
  optionTwoVotes,
  users,
}) => {
  function votedPercentage() {
    let votes = optionOneVotes.length + optionTwoVotes.length;
    let usersCount = users.length;
    if (votes === 0) {
      return "None of the user voted";
    }
    return `${((votes / usersCount) * 100).toFixed(
      0
    )} % users has voted in this pool`;
  }

  return (
    <>
      <div className="pool-percentage">{votedPercentage()}</div>
      <div className="pool-options">
        <div className="pool-option voted">
          <div className="pool-option-text">{optionOne}</div>
          <div className="pool-option-answered">
            <span>Answered by: </span>
            <span>{optionOneVotes.length}</span>
          </div>
        </div>
        <div className="pool-option voted">
          <div className="pool-option-text">{optionTwo}</div>
          <div className="pool-option-answered">
            <span>Answered by: </span>
            <span>{optionTwoVotes.length}</span>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = ({ questions, users, authedUser }, props) => {
  const { id } = props.router.params;
  const user = users[authedUser.userName];

  return {
    question: questions[id],
    author: users[questions[id]?.author],
    optionOne: questions[id].optionOne.text,
    optionTwo: questions[id].optionTwo.text,
    optionOneVotes: questions[id].optionOne.votes,
    optionTwoVotes: questions[id].optionTwo.votes,
    users: Object.values(users),
    questionsAnswered: Object.keys(user.answers),
  };
};

export default withRouter(connect(mapStateToProps)(PoolPage));

import { connect } from "react-redux";
import Question from "../components/Question";
import "./DashboardPage.css";
import React, { useState } from "react";

const DashboardPage = ({ questionsNew, questionsAnswered }) => {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <div className="dashboard-page">
      <h1>Dashboard</h1>

      <div className="dashboard-page-switch">
        <button
          type="button"
          className="button"
          disabled={tabIndex == 0}
          onClick={() => setTabIndex(0)}
        >
          New questions
        </button>
        <button
          type="button"
          className="button"
          disabled={tabIndex == 1}
          onClick={() => setTabIndex(1)}
        >
          Answered questions
        </button>
      </div>

      {tabIndex === 0 && (
        <>
          <h2>New questions</h2>
          <ul className="question-list ">
            {questionsNew.map((id) => (
              <li key={id}>
                <Question id={id} />
              </li>
            ))}
          </ul>
        </>
      )}

      {tabIndex === 1 && (
        <>
          <h2>Answered questions</h2>
          <ul className="question-list ">
            {questionsAnswered.map((id) => (
              <li key={id}>
                <Question id={id} />
              </li>
            ))}
          </ul>
        </>
      )}
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
  const questionList = Object.values(questions)
    .sort((a, b) => b.timestamp - a.timestamp)
    .map((a) => a.id);
  const answeredQuesitonIds = Object.keys(user.answers);

  return {
    questionsNew: questionList.filter(
      (id) => !answeredQuesitonIds.includes(id)
    ),
    questionsAnswered: questionList.filter((id) =>
      answeredQuesitonIds.includes(id)
    ),
  };
};

export default connect(mapStateToProps)(DashboardPage);

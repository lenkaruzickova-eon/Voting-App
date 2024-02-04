import { generateUID } from "../utils/_DATA";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const SAVE_QUESTION = "SAVE_QUESTION";
export const SAVE_ANSWER = "SAVE_ANSWER";

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}

export function saveQuestion(question) {
  return {
    type: SAVE_QUESTION,
    question,
  };
}

export function handleSaveQuestion(firstOption, secondOption) {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    return dispatch(
      saveQuestion({
        id: generateUID(),
        timestamp: Date.now(),
        optionOne: { text: firstOption, votes: [] },
        optionTwo: { text: secondOption, votes: [] },
        author: authedUser.userName,
      })
    );
  };
}

export function saveAnswer(answer) {
  return {
    type: SAVE_ANSWER,
    answer,
  };
}

export function handleSaveAnswer(questionId, option) {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    return dispatch(
      saveAnswer({
        questionId,
        option,
        userId: authedUser.userName,
      })
    );
  };
}

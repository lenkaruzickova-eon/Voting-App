import {
  RECEIVE_QUESTIONS,
  SAVE_QUESTION,
  SAVE_ANSWER,
} from "../actions/questions";

export default function questions(state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return { ...state, ...action.questions };

    case SAVE_QUESTION: {
      const { question } = action;
      {
        return {
          ...state,
          [question.id]: question,
        };
      }
    }

    case SAVE_ANSWER: {
      const {
        answer: { questionId, option, userId },
      } = action;
      const q = state[questionId];
      if (option === 1) {
        q.optionOne.votes = [...q.optionOne.votes, userId];
      } else if (option === 2) {
        q.optionTwo.votes = [...q.optionOne.votes, userId];
      }

      return {
        ...state,
        [q.id]: q,
      };
    }

    default:
      return state;
  }
}

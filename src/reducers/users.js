import { RECEIVE_USERS } from "../actions/users";
import { SAVE_ANSWER, SAVE_QUESTION } from "../actions/questions";

export default function users(state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return { ...state, ...action.users };

    case SAVE_ANSWER: {
      const {
        answer: { questionId, option, userId },
      } = action;

      const user = state[userId];
      if (option === 1) {
        user.answers[questionId] = "optionOne";
      } else if (option === 2) {
        user.answers[questionId] = "optionTwo";
      }

      return {
        ...state,
        [user.id]: user,
      };
    }

    case SAVE_QUESTION: {
      const {
        question: { id, author },
      } = action;
      const user = state[author];
      user.questions = [...user.questions, id];
      {
        return {
          ...state,
          [user.id]: user,
        };
      }
    }

    default:
      return state;
  }
}

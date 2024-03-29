import { combineReducers } from "redux";
import authedUser from "./authedUser";
import users from "./users";
import questions from "./questions";
import returnUrl from "./returnUrl";

export default combineReducers({
  authedUser,
  users,
  questions,
  returnUrl,
});

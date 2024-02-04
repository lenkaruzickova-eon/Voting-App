import { SET_AUTHED_USER, SET_LOGOUT_AUTHEDUSER } from "../actions/authedUser";

export default function authedUser(state = null, action) {
  switch (action.type) {
    case SET_AUTHED_USER:
      return action.user;
    case SET_LOGOUT_AUTHEDUSER:
      return null;
    default:
      return state;
  }
}

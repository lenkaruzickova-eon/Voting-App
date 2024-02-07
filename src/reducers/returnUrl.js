import { SET_RETURN_URL } from "../actions/returnUrl";

export default function returnUrl(state = null, action) {
  switch (action.type) {
    case SET_RETURN_URL:
      return action.url;
    default:
      return state;
  }
}

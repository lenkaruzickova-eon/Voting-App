export const SET_AUTHED_USER = "SET_AUTHED_USER";
export const SET_LOGOUT_AUTHEDUSER = "SET_LOGOUT_AUTHEDUSER";

export function setAuthedUser(user) {
  return {
    type: SET_AUTHED_USER,
    user,
  };
}

export function handleAuthedUser(user) {
  return (dispatch) => {
    return dispatch(
      setAuthedUser({
        userName: user.id,
        avatarURL: user.avatarURL,  
      })
    );
  };
}

export function setLogoutAuthedUser() {
  return {
    type: SET_LOGOUT_AUTHEDUSER,
  };
}

export function handleLogoutAuthedUser() {
  return (dispatch) => {
    return dispatch(setLogoutAuthedUser());
  };
}

export const SET_RETURN_URL = "SET_RETURN_URL";

export function setReturnUrl(url) {
  return {
    type: SET_RETURN_URL,
    url,
  };
}

export function handleSetReturnUrl(url) {
  return (dispatch) => {
    return dispatch(setReturnUrl(url));
  };
}

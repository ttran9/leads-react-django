import axios from "axios";
import { returnErrors } from "./messages";
import { USER_LOADED, USER_LOADING, AUTH_ERROR } from "./types";

// CHECK TOKEN AND LOAD USER.
export const loadUser = () => (dispatch, getState) => {
  // User loading
  dispatch({ type: USER_LOADING });

  // grab the token from the state.
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // If token, add to headers config
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  axios
    .get("/api/auth/user", config)
    .then(response => {
      dispatch({
        type: USER_LOADED,
        payload: response.data
      });
    })
    .catch(error => {
      dispatch(returnErrors(error.response.data, error.response.status));
      dispatch({
        type: AUTH_ERROR
      });
    });
};

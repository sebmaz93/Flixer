import axios from "axios";
import { showLoginError } from "./Error_Action";
import Amplitude from "react-amplitude";
import jwtDecode from "jwt-decode";


export const login = token => {
  try {
    return { type: "LOGIN", token };
  } catch (e) {
    return { type: "LOGIN", token: null };
  }
};
export const logout = () => {
  localStorage.removeItem("token");
  return {
    type: "LOGOUT"
  };
};
export const loginWithGoogle = id_token => {
  return dispatch => {
    axios
      .post(process.env.AUTH_URL + "/auth/google/exchange", {
        id_token
      })
      .then(res => {
        localStorage.setItem("token", res.data.access_token);
        console.log(res.data.access_token);

        var jwtToken = res.data.access_token;
        var jwt = jwtToken ? jwtDecode(jwtToken) : null;
        jwtToken ? console.log("token: " + jwtToken) : console.log("no token");
        jwt ? console.log("user: " + jwt.user) : console.log("no user");
        Amplitude.setUserId(jwt.user);

        dispatch(login(res.data.access_token));
      })
      .catch(err => {
        dispatch(showLoginError());
      });
  };
};

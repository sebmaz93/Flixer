import { axiosBase } from "../axiosConfig";
import { logout } from "./Auth_Action";
import { showSpinner, hideSpinner } from "./Spinner_Action";

export const initalizeHome = (data = []) => {
  return {
    type: "INITALIZE_HOME",
    data
  };
};
export const toggleFavorite = (video = {}, title = "") => ({
  type: "TOGGLE_FAVORITE",
  video,
  title
});

export const removeFavorite = (id = "") => ({
  type: "REMOVE_FAVORITE",
  id
});

export const fetchHome = () => {
  return dispatch => {
    const token = localStorage.getItem("token");
    dispatch(showSpinner());
    return axiosBase(token)
      .get("/home")
      .then(res => {
        dispatch(initalizeHome(res.data.content));
        dispatch(hideSpinner());
      })
      .catch(err => {
        console.log(err);
        dispatch(logout());
      });
  };
};

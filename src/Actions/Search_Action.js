import { axiosBase } from "../axiosConfig";
import { logout } from "./Auth_Action";
import { showSpinner, hideSpinner } from "./Spinner_Action";

export const setSearchText = searchText => {
  return {
    type: "SET_SEARCH_TEXT",
    searchText
  };
};

export const setSearchContent = content => {
  return {
    type: "SET_SEARCH_CONTENT",
    content
  };
};

export const fetchSearchContent = query => {
  const token = localStorage.getItem("token");
  return dispatch => {
    dispatch(showSpinner());
    return axiosBase(token)
      .get(`/search/content/${query}`)
      .then(res => {
        dispatch(setSearchContent(res.data.content));
        dispatch(setSearchText(""));
        dispatch(hideSpinner());
      })
      .catch(err => {
        if (err.status === 401) {
          dispatch(displogout());
        }
      });
  };
};

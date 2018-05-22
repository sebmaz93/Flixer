import { axiosBase } from "../axiosConfig";
import { logout } from "./Auth_Action";
import { toggleFavorite } from "./VideoInfo_Action";
import { showSpinner, hideSpinner } from "./Spinner_Action";

export const initalizeFavoriteVideos = favoriteVideos => {
  return {
    type: "INITALIZE_FAVORITE",
    favoriteVideos
  };
};

export const fetchFavoriteVideos = () => {
  return dispatch => {
    dispatch(showSpinner());
    const token = localStorage.getItem("token");
    return axiosBase(token)
      .get("/favorites")
      .then(res => {
        dispatch(initalizeFavoriteVideos(res.data.content));
        dispatch(hideSpinner());
      })
      .catch(err => {
        dispatch(logout());
      });
  };
};

export const addFavorite = (id, season) => {
  return dispatch => {
    const token = localStorage.getItem("token");
    return axiosBase(token)
      .post(`/favorites/add/${id}`)
      .then(res => {
        dispatch(toggleFavorite(id, season));
      })
      .catch(err => {
        if (err.status === 401) dispatch(logout());
      });
  };
};
export const deleteFavorite = (id, season) => {
  return dispatch => {
    const token = localStorage.getItem("token");
    return axiosBase(token)
      .delete(`/favorites/${id}`)
      .then(res => {
        console.log(res);
        dispatch(toggleFavorite(id, season));
      })
      .catch(() => {});
  };
};

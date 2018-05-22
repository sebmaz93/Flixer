import { axiosBase } from "../axiosConfig";
import { logout } from "./Auth_Action";
import Cookies from "js-cookie";

import { showSpinner, hideSpinner } from "./Spinner_Action";

export const selectVideo = (video = null) => {
  return {
    type: "SELECT_VIDEO",
    video
  };
};
export const setSeasons = (seasons = []) => {
  return {
    type: "SET_SEASONS",
    seasons
  };
};
export const setPlayVideo = (url = "") => {
  return {
    type: "SET_VIDEO_URL",
    url
  };
};
export const deletePlayVideoUrl = () => {
  return {
    type: "DELETE_VIDEO_URL"
  };
};
export const setPlayVideoMeidaId = id => {
  return {
    type: "SET_VIDEO_MEDIA_ID",
    id
  };
};
export const deletPlayVideoMeidaId = () => {
  return { type: "DELETE_VIDEO_MEDIA_ID" };
};

export const toggleFavorite = (id, season) => {
  return {
    type: "TOGGLE_FAVORITE",
    id,
    season
  };
};
export const setPlaybackTime = (id, time) => {
  return dispatch => {
    const token = localStorage.getItem("token");
    return axiosBase(token)
      .post(`/content/playback/set/${id}/${time * 1000}`)
      .then(res => console.log(res))
      .catch(err => {
        if (err.status === 401) {
          dispatch(logout());
        }
      });
  };
};
export const fetchSeasons = id => {
  return dispatch => {
    dispatch(showSpinner());
    const token = localStorage.getItem("token");
    return axiosBase(token)
      .get(`/series/seasons/${id}`)
      .then(res => {
        dispatch(setSeasons(res.data.data.seasons));
        dispatch(hideSpinner());
      })
      .catch(err => {
        console.log(err);
        // dispatch(logout());
      });
  };
};

export const fetchPlayVideo = media_id => {
  return dispatch => {
    const token = localStorage.getItem("token");
    return axiosBase(token)
      .get(`/content/play/${media_id}`)
      .then(res => {
        const date = new Date(res.data.expires * 1000);
        Cookies.set("CloudFront-Policy", res.data["CloudFront-Policy"], {
          path: "/",
          domain: ".plix.com.ar",
          expires: new Date(new Date().getTime() + 15 * 60 * 1000),
          secure: true
        });
        Cookies.set("CloudFront-Signature", res.data["CloudFront-Signature"], {
          path: "/",
          domain: ".plix.com.ar",
          expires: new Date(new Date().getTime() + 15 * 60 * 1000),
          secure: true
        });
        Cookies.set(
          "CloudFront-Key-Pair-Id",
          res.data["CloudFront-Key-Pair-Id"],
          {
            path: "/",
            domain: ".plix.com.ar",
            expires: new Date(new Date().getTime() + 15 * 60 * 1000),
            secure: true
          }
        );
        Cookies.set(
          "StreamingToken",
          res.data["StreamingToken"],
          {
            path: "/",
            domain: ".plix.com.ar",
            expires: new Date(new Date().getTime() + 15 * 60 * 1000),
            secure: true
          }
        );
        console.log(res.data.url);
        dispatch(setPlayVideoMeidaId(media_id));
        dispatch(setPlayVideo(res.data.url));
      })
      .catch(err => {
        console.log(err);
      });
  };
};

// CloudFront-Signature=HfEUDHfClZTxuX3m-7TszWKraG9h38A428NJ5r2mpoXtxN9i3QhndLOv5UD3iodA2vDfY4M3ps6shioNDp~JRBQN8PGX0nDLzyjQk8tcFS~U5gjwk~aBGLXrR-bMiqKWjMJmzlUc41yiEMHFuQBQGlK~8BOg6nYUqVK71AOPpczI4RDeAcpI-mk1L7K2UV2E54tXIRAijeCq7mYMGplyJWVYSaZvg3qvIaUVnNFkcxTOCSatBf-VyT9vTSh6qRiauiBp3eecTN7j~-um8Ya2Ku-sK8eG~gNtSYApgERMKR25kYE5sNj58OoiXs6in1dK67ogNdX6taQ1~RorGu1e5g__; path=/; domain=cdn.plix.com.ar; Expires=Tue, 19 Jan 2038 03:14:07 GMT;

// CloudFront-Key-Pair-Id=APKAJDDF6EAZ77VWNV7Q; path=/; domain=cdn.plix.com.ar; Expires=Tue, 19 Jan 2038 03:14:07 GMT;

// CloudFront-Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9jZG4ucGxpeC5jb20uYXIvNmEzZDAwN2UtODk0Zi00MTZlLTljYWMtZmMxYTEwODcwZGRhLyoiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE1MjEwODMyMzd9LCJJcEFkZHJlc3MiOnsiQVdTOlNvdXJjZUlwIjoiMzcuMTU3LjIxNi4xNTkvMzIifX19XX0_; path=/; domain=cdn.plix.com.ar; Expires=Tue, 19 Jan 2038 03:14:07 GMT;

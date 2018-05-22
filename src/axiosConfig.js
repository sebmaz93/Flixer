import axios from "axios";

export const axiosBase = token => {
  return axios.create({
    baseURL: process.env.BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

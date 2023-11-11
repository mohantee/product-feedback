import Axios from "axios";

export const axios = Axios.create({
  baseURL: "http://127.0.0.1:3000",
});

axios.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || error.message;

    console.error(message);
    return Promise.reject(error);
  }
);

import axios from "axios";

// const LOCAL_BACKEND = "http://localhost:4500/api";
// const LOCAL_BACKEND = import.meta.env.VITE_LOCAL_BACKEND;
const APP_BACKEND = import.meta.env.VITE_APP_BACKEND_URL;
// console.log("BASEURL", LOCAL_BACKEND);

export const api = axios.create({
  baseURL: APP_BACKEND,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
  },
});

api.interceptors.request.use(
  (request) => {
    console.log("Starting Request", request);
    request.headers.authorization = `${sessionStorage.getItem("token")}`;
    return request;
  },
  function (error) {
    console.log("REQUEST ERROR", error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    error = error.response.data;
    console.log("RESPONSE ERROR", error);
    return Promise.reject(error);
  }
);

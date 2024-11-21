import axios from "axios";

const LOCAL_BACKEND = import.meta.env.VITE_LOCAL_BACKEND;
console.log("BASEURL", LOCAL_BACKEND);

// 토큰이 없다면 로그인 페이지로 리다이렉트
const token = sessionStorage.getItem("token");
if (!token) {
  console.error("토큰이 없습니다. 로그인 페이지로 이동합니다.");
  // window.location.href = "/login"; // 토큰이 없으면 로그인 페이지로 리다이렉트
}

export const api = axios.create({
  baseURL: LOCAL_BACKEND,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`, // 토큰 설정
  },
});

// 요청 인터셉터 (요청을 보낼 때마다)
api.interceptors.request.use(
  (request) => {
    console.log("Starting Request", request);
    return request;
  },
  function (error) {
    console.log("REQUEST ERROR", error);
  }
);

// 응답 인터셉터 (응답을 받을 때마다)
api.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    if (error.response) {
      console.log("RESPONSE ERROR", error.response.data);
      return Promise.reject(error.response.data); // 응답 객체가 있을 때만 처리
    } else {
      console.log("REQUEST ERROR", error); // 네트워크 에러 등
      return Promise.reject(error);
    }
  }
);

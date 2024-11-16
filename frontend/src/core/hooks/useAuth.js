import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { createUser, postLogin } from "../api/auth";

export const useLogin = () => {
  return useMutation({
    mutationFn: ({ email, password }) => postLogin(email, password),
    onSuccess: (data) => {
      sessionStorage.setItem("token", data.token); // 성공 시 토큰 저장
      console.log("로그인 성공:", data);
    },
    onError: (error) => {
      console.error("로그인 실패:", error.message);
    },
  });
};

export const useSignUp = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ name, email, password }) =>
      createUser({ name, email, password }),
    onSuccess: (data) => {
      navigate("/user/detail");
      console.log("회원가입", data);
    },
    onError: (error) => {
      console.log("회원가입 실패:", error);
    },
  });
};

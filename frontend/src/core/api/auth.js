import { api } from "./api";

export const postLogin = async ({ email, password }) => {
  console.log("Login arguments:", { email, password }); // 확인 로그

  const { data } = await api.post("/login", { email, password });
  return data;
};

export const createUser = async ({ name, email, password }) => {
  const { data } = await api.post("/signup", { name, email, password });
  return data;
};

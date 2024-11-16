import { api } from "../../utils/api";

export const postLogin = async ({ email, password }) => {
  const { data } = await api.post("/login", { email, password });
  return data;
};

export const createUser = async ({ name, email, password }) => {
  console.log("createUser arguments:", name, email, password); // 값이 제대로 전달되는지 확인

  const { data } = await api.post("/signup", { name, email, password });
  return data;
};

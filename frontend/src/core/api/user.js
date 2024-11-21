import { api } from "./api";

export const getMyInfo = async () => {
  try {
    const { data } = await api.get("/user/me");
    return data;
  } catch (error) {
    console.error("내 정보 조회 실패:", error);
  }
};

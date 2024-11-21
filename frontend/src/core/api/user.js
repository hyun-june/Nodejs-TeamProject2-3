import { api } from "./api";

// 내 정보 조회 api
export const getMyInfo = async () => {
  try {
    const { data } = await api.get("/user/me");
    return data;
  } catch (error) {
    console.error("내 정보 조회 실패:", error);
  }
};

// 다른 사람 정보 조회 api
export const getOtherInfo = async (id) => {
  try {
    const { data } = await api.get(`/user/other/${id}`);
    return data;
  } catch (error) {
    console.error("다른 사람 정보 조회 실패:", error);
  }
};

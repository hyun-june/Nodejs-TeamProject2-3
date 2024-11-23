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

export const getUserDetail = async () => {
  try {
    const { data } = await api.get(`/user/detail`);
    return data;
  } catch (error) {
    console.error("상세 정보 불러오기 실패:", error);
  }
};

export const updateUserDetail = async (formData) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  try {
    const { data } = await api.put("/user/detail", formData, config);
    console.log("서버 응답 데이터", data); // 서버에서 응답 확인
    return data;
  } catch (error) {
    console.error("상세 정보 수정 실패:", error);
  }
};

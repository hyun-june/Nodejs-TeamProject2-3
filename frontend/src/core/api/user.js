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

// export const updateUserDetail = async (formData) => {
//   try {
//     const config = {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     };
//     const { data } = await api.put("/user/detail", formData, config);
//     console.log("서버 응답 데이터", data); // 서버에서 응답 확인
//     return data;
//   } catch (error) {
//     console.error("상세 정보 수정 실패:", error);
//   }
// };

export const updateUserDetail = async ({
  nickname,
  age,
  height,
  weight,
  purpose,
  profileUrl,
}) => {
  const profileInfoData = new FormData();

  // 파일 처리: profileUrl이 있으면 첨부, 없으면 기본 이미지 사용
  if (profileUrl) {
    profileInfoData.append("profileImg", profileUrl); // profileUrl을 profileImg 필드명으로 전송
  } else {
    profileInfoData.append("profileImg", "/basic-profile.png"); // 기본 프로필 이미지
  }

  // 나머지 데이터 추가
  profileInfoData.append("nickname", nickname);
  profileInfoData.append("age", age);
  profileInfoData.append("height", height);
  profileInfoData.append("weight", weight);
  profileInfoData.append("purpose", purpose);

  const config = {
    headers: {
      "Content-Type": "multipart/form-data", // Content-Type을 multipart로 설정
    },
  };

  try {
    const { data } = await api.put("/user/detail", profileInfoData, config); // FormData 전송
    console.log("서버 응답 데이터", data);
    return data;
  } catch (error) {
    console.error("상세 정보 수정 실패:", error);
  }
};

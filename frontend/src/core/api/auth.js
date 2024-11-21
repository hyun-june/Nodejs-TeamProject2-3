import { api } from "./api";

export const postLogin = async ({ email, password }) => {
  console.log("Login arguments:", { email, password }); // 확인 로그

  const { data } = await api.post("/login", { email, password });
  return data;
};

export const createUser = async ({ name, email, password }) => {
  if (!name || !email || !password) {
    throw new Error("필수 정보가 누락되었습니다.");
  }
  const { data } = await api.post("/signup", { name, email, password });
  return data;
};

export const inputUserDetail = async ({
  nickname,
  age,
  height,
  weight,
  purpose,
  profileUrl,
}) => {
  const profileInfoData = new FormData();
  if (profileUrl) {
    profileInfoData.append("profileImg", profileImgfile);
  } else {
    profileInfoData.append("profileImg", "/basic-profile.png");
  }
  profileInfoData.append("nickname", nickname);
  profileInfoData.append("age", age);
  profileInfoData.append("height", height);
  profileInfoData.append("weight", weight);
  profileInfoData.append("purpose", purpose);

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  const { data } = await api.post("/user/detail", profileInfoData, config);
  console.log(data);
  return data;
};

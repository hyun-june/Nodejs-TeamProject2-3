import { api } from "./api";

export const createFeed = async ({ fileUrl, description, hashtags, user }) => {
  const feedFormData = new FormData();

  // if (fileUrl && fileUrl instanceof File) {
  //   formData.append("file", fileUrl); // "file"이라는 키로 파일 추가
  // } else {
  //   // 기본 이미지 URL 처리
  //   formData.append("file", "uploads/profiles/basic-profile.png"); // 기본 프로필 이미지 경로 추가
  // }
  feedFormData.append("file", fileUrl);

  feedFormData.append("description", description);
  feedFormData.append("hashtags", JSON.stringify(hashtags));
  feedFormData.append("user", user);

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  const { data } = await api.post("/feed", feedFormData, config);
  console.log(data);
  return data;
};

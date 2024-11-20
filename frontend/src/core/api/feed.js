import { api } from "../../utils/api";

export const createFeed = async ({ fileUrl, description, hashtags, user }) => {
  console.log("CREATE FEED", { fileUrl, description, hashtags, user });
  const formData = new FormData();
  formData.append("fileUrl", fileUrl);
  formData.append("description", description);
  formData.append("hashtags", JSON.stringify(hashtags));
  formData.append("user", user);

  const { data } = await api.post("/feed", formData);
  return data;
};

import { api } from "./api";

export const createFeed = async ({ fileUrl, description, hashtags, user }) => {
  const feedFormData = new FormData();
  feedFormData.append("file", fileUrl);

  feedFormData.append("description", description);
  hashtags.forEach((tag) => {
    feedFormData.append("hashtags[]", tag);
  });
  feedFormData.append("userInfo", user);

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  const { data } = await api.post("/feed", feedFormData, config);
  return data;
};

export const getFeed = async (page = 1) => {
  try {
    const { data } = await api.get(`/feed?page=${page}`);

    return {
      data: data.data,
      page: data.page,
      total_pages: data.total_pages,
    };
  } catch (error) {
    console.log("getFeed Error", error);
  }
};

export const getDetailFeed = async (id) => {
  try {
    const { data } = await api.get(`/feed/${id}`);
    return data.data;
  } catch (error) {
    console.log("getFeed Error", error);
  }
};

export const updateComments = async ({ id, newCommentText }) => {
  console.log("댓글 추가 요청 - ID:", id);
  console.log("댓글 내용:", newCommentText);
  try {
    const { data } = await api.post(`/feed/${id}`, {
      content: newCommentText,
    });
    console.log("댓글 추가 성공", data);
    return data;
  } catch (error) {
    console.error("댓글 추가 실패:", error);
  }
};

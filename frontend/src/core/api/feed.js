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

export const getFeed = async (page = 1, limit) => {
  try {
    const { data } = await api.get(`/feed?page=${page}&limit=${limit}`);
    return {
      data: data.data,
      page: data.page,
      total_pages: data.total_pages,
    };
  } catch (error) {
    console.log("getFeed Error", error);
  }
};

export const getAllFeedApi = async (query) => {
  try {
    const { data } = await api.get(`/feed/all`, { params: { ...query } });
    return data;
  } catch (error) {
    console.error("Error fetching food data:", error);
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

export const deleteFeedApi = async (id) => {
  try {
    const { data } = await api.delete(`/feed/${id}`);
    return data;
  } catch (error) {
    console.error("Error delete food data:", error);
  }
};

// export const getFeedSearchResult = async(query);

export const updateComments = async ({ id, newCommentText }) => {
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

export const registerFeedView = async (feedId) => {
  console.log("ffff", feedId);
  try {
    console.log("API 요청 경로:", `/feed/${feedId}/view`);
    const { data } = await api.put(`/feed/${feedId}/view`);
    console.log("서버 응답 데이터:", data);

    return data; // 업데이트된 피드 데이터 반환
  } catch (error) {
    console.error("조회 수 업데이트 실패:", error);
  }
};

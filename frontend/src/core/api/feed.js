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

export const getFeedSearchResult = async ({ query, limit, page }) => {
  if (!query) return [];
  try {
    const { data } = await api.get(
      `/feed?page=${page}&limit=${limit}&q=${query}`
    );

    return {
      data: data.data,
      page: data.page,
      total_pages: data.total_pages,
    };
  } catch (error) {
    console.error("피드 검색 중 에러:", error);
    return [];
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
  try {
    console.log("API 요청 경로:", `/feed/${feedId}/view`);
    const { data } = await api.put(`/feed/${feedId}/view`);
    console.log("서버 응답 데이터:", data);

    return data; // 업데이트된 피드 데이터 반환
  } catch (error) {
    console.error("조회 수 업데이트 실패:", error);
  }
};

export const deleteComments = async ({ id, commentId }) => {
  try {
    const { data } = await api.delete(`/feed/${id}/comments/${commentId}`);
    console.log("댓글 삭제 성공", data);
    return data;
  } catch (error) {
    console.log("댓글 삭제 실패", error);
  }
};

// 좋아요 등록 함수
export const registerLike = async (feedId, userId) => {
  console.log("ffff", feedId), console.log("uuuu", userId);

  try {
    // 좋아요 등록을 위한 POST 요청
    const { data } = await api.post(`/feed/${feedId}/like`, {
      userId, // 사용자 ID를 전달
    });

    console.log("좋아요 등록 성공:", data);
    return data; // 응답 데이터를 반환
  } catch (error) {
    console.error("좋아요 등록 실패:", error);
  }
};

// 좋아요 취소 함수
export const registerUnlike = async (feedId, userId) => {
  try {
    // 좋아요 취소를 위한 POST 요청
    const { data } = await api.post(`/feed/${feedId}/unlike`, {
      userId: userId, // 사용자 ID를 전달
    });

    console.log("좋아요 취소 성공:", data);
    return data; // 응답 데이터를 반환
  } catch (error) {
    console.error("좋아요 취소 실패:", error);
  }
};

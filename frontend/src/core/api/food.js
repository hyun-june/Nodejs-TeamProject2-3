import { api } from "./api";

export const getAllFoodApi = async (query) => {
  try {
    const { data } = await api.get(`/food`, { params: { ...query } });
    return data;
  } catch (error) {
    console.error("Error fetching food data:", error);
  }
};

export const getFoodApi = async (id) => {
  try {
    const { data } = await api.get(`/food/${id}`);
    return data;
  } catch (error) {
    console.error("Error fetching food data:", error);
  }
};

export const createFoodApi = async (formData) => {
  try {
    const { data } = await api.post(`/food`, formData);
    return data;
  } catch (error) {
    console.error("Error create food data:", error);
  }
};

export const updateFoodApi = async (formData) => {
  try {
    const { data } = await api.put(`/food/${formData.id}`, formData);
    return data;
  } catch (error) {
    console.error("Error update food data:", error);
  }
};

export const deleteFoodApi = async (id) => {
  try {
    const { data } = await api.delete(`/food/${id}`);
    return data;
  } catch (error) {
    console.error("Error delete food data:", error);
  }
};

export const getFoodSearchResult = async (query, mealtype) => {
  if (!query) return [];
  try {
    const { data } = await api.get(`/food/search/${mealtype}`, {
      params: { q: query },
    });
    return data;
  } catch (error) {
    console.error("음식 검색 중 에러:", error);
    return []; // 오류 발생 시 빈 배열 반환
  }
};

// 특정 날짜의 음식 데이터 가져오기
export const getDailyFood = async (date) => {
  try {
    const { data } = await api.get(`/food/daily`, {
      params: { date },
    });
    console.log("음식 데이터:", data);
    return data;
  } catch (error) {
    console.error("음식 데이터 가져오는 중 에러:", error);
  }
};

// 특정 날짜의 음식 추가하기
export const addDailyFood = async (food, mealtype, quantity, date) => {
  try {
    const { data } = await api.post(
      `/food/add/${mealtype}`,
      { food, mealtype, quantity },
      { params: { date } }
    );
    return data;
  } catch (error) {
    console.error("음식 추가 중 에러:", error);
    if (error.response) {
      console.error("응답 에러 내용:", error.response.data);
    }
    throw error;
  }
};

// 데일리 음식 데이터 업데이트
export const updateDailyFood = async (quantity, foodId) => {
  try {
    const { data } = await api.put(`/food/daily`, { quantity, foodId });
    return data;
  } catch (error) {
    console.error("음식 수정 중 에러:", error);
    throw error;
  }
};

// 데일리 음식 데이터 삭제
export const deleteDailyFood = async (foodId) => {
  try {
    const { data } = await api.delete(`/food/daily`, {
      data: { foodId }, // body에 foodId 전달
    });
    return data;
  } catch (error) {
    console.error("데일리 음식 삭제 중 에러:", error);
    throw error;
  }
};

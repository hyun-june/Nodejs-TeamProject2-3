import { api } from "./api";
export const getFoodSearchResult = async (query, mealtype) => {
  if (!query) return [];
  try {
    // URL 경로는 '/food/search/${mealtype}'이고, q와 date는 쿼리 파라미터로 전달
    const { data } = await api.get(`/food/search/${mealtype}`, {
      params: { q: query }, // 쿼리 파라미터로 q와 date 전달
    });
    return data; // 응답 데이터 반환
  } catch (error) {
    console.error("Error fetching food data:", error); // 오류 처리
    return []; // 오류 발생 시 빈 배열 반환
  }
};

export const getDailyFood = async (query) => {
  try {
    const { data } = await api.get(`/food?date=${query}`);
    console.log("데이터", data);
    return data;
  } catch (error) {
    console.error("Error fetching daily food data:", error);
    throw error; // 필요한 경우 상위로 에러 전달
  }
};
export const addDailyFood = async (food, mealtype, quantity) => {
  try {
    const { data } = await api.post(`/food/add/${mealtype}`, {
      food,
      mealtype,
      quantity,
    });
    return data;
  } catch (error) {
    console.error("음식 추가 중 에러:", error);
    if (error.response) {
      console.error("응답 에러 내용:", error.response.data);
    }
  }
};

export const updateDailyFood = async (quantity, foodId) => {
  try {
    const { data } = await api.put("/food", { quantity, foodId });
    return data;
  } catch (error) {
    console.error("음식 수정 중 에러", error);
  }
};

export const deleteDailyFood = async (foodId) => {
  try {
    const { data } = await api.delete("/food", { data: { foodId } });
    return data;
  } catch (error) {
    console.error("음식 삭제 중 에러", error);
  }
};

import { api } from "../../utils/api";
export const getFoodSearchResult = async (query, mealtype) => {
  if (!query) return []; // 쿼리 값이 없으면 빈 배열 반환
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
    } else if (error.request) {
      console.error("요청이 보내졌으나 응답을 받지 못함:", error.request);
    } else {
      console.error("요청 설정 중 에러:", error.message);
    }
  }
};

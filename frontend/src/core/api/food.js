import { api } from "./api";
export const getFoodSearchResult = async (query) => {
  if (!query) return [];
  try {
    const { data } = await api.get(`/food/search?q=${query}`);
    console.log("Data fetched:", data); // 데이터가 잘 받아지는지 확인
    return data;
  } catch (error) {
    console.error("Error fetching food data:", error);
    return [];
  }
};

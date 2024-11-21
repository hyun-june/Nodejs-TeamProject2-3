import { useMutation, useQuery } from "@tanstack/react-query";
import { getDailyFood, getFoodSearchResult } from "../api/food";
import { addDailyFood } from "../api/food";
export const useFoodSearch = (query, mealtype) => {
  console.log("Query received:", query); // query 값이 제대로 전달되는지 확인
  console.log("Mealtype received:", mealtype); // mealtype 값이 제대로 전달되는지 확인

  return useQuery({
    queryKey: ["foodSearch", query, mealtype],
    queryFn: () => getFoodSearchResult(query, mealtype),
    onSuccess: (data) =>
      console.log("검색한 음식을 불러오는 데 성공했습니다.", data),
    onError: (error) =>
      console.log("검색한 음식을 불러오는 데 실패했습니다.", error),
    enabled: !!query, // query가 있을 때만 실행
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
};

export const useFoodPage = (query) => {
  return useQuery({
    queryKey: ["dailyFood", query],
    queryFn: () => getDailyFood(query),
    onSuccess: (data) => console.log("FoodPage 불러오기 성공", data),
    onError: (data) => console.log("FoodPage 불러오기 실패", data),
    enabled: !!query,
    staleTime: 5 * 60 * 1000,
  });
};

export const useAddFood = () => {
  return useMutation({
    mutationFn: async ({ food, mealtype, quantity }) => {
      console.log("food-mutation", food);
      console.log("mealtype-mutation", mealtype);
      console.log("quantity-mutation", quantity);

      return await addDailyFood(mealtype, food, quantity);
    },
    onSuccess: (data) => {
      console.log("음식 추가 성공", data);
    },
    onError: (error) => {
      console.log("음식 추가 실패", error);
    },
  });
};

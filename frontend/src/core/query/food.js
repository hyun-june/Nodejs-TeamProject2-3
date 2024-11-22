import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
  getDailyFood,
  getFoodSearchResult,
  updateDailyFood,
} from "../api/food";
import { addDailyFood } from "../api/food";

export const useFoodSearch = (query, mealtype) => {
  return useQuery({
    queryKey: ["foodSearch", query, mealtype],
    queryFn: () => getFoodSearchResult(query, mealtype),
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
    onError: (data) => console.log("FoodPage 불러오기 실패", data),
    enabled: !!query,
    staleTime: 5 * 60 * 1000,
  });
};

export const useAddFood = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient(); // useQueryClient로 QueryClient 인스턴스 가져오기

  return useMutation({
    mutationFn: async ({ food, mealtype, quantity }) => {
      return await addDailyFood(food, mealtype, quantity);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries("dailyFood");
      navigate("/food");
      console.log("음식 추가 성공", data);
    },
    onError: (error) => {
      console.log("음식 추가 실패", error);
    },
  });
};

export const useUpdateFood = () => {
  return useMutation({
    mutationFn: async ({ quantity, foodId }) => {
      return await updateDailyFood(quantity, foodId);
    },
    onSuccess: (data) => {
      console.log("음식 수정 성공", data);
    },
    onError: (error) => {
      console.log("음식 수정 실패", error);
    },
  });
};

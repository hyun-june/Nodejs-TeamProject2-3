import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
  deleteDailyFood,
  getDailyFood,
  getFoodSearchResult,
  updateDailyFood,
  getAllFoodApi,
  getFoodApi,
  createFoodApi,
  updateFoodApi,
  deleteFoodApi,
} from "../api/food";
import { addDailyFood } from "../api/food";

export const useGetAllFood = (query) => {
  return useQuery({
    queryKey: ["food", query],
    queryFn: () => getAllFoodApi(query),
  });
};

export const useGetFood = (id) => {
  return useQuery({
    queryKey: ["food", id],
    queryFn: () => getFoodApi(id),
  });
};

export const useCreateFood = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createFoodApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["food"] });
    },
  });
};

export const useUpdateFood = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateFoodApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["food"] });
    },
  });
};

export const useDeleteFood = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteFoodApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["food"] });
    },
  });
};

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

export const useAddDailyFood = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient(); // useQueryClient로 QueryClient 인스턴스 가져오기

  return useMutation({
    mutationFn: async ({ food, mealtype, quantity, date }) => {
      return await addDailyFood(food, mealtype, quantity, date);
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

export const useUpdateDailyFood = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ quantity, foodId }) => {
      return await updateDailyFood(quantity, foodId);
    },
    onSuccess: (data) => {
      console.log("음식 수정 성공", data);
      queryClient.invalidateQueries(["dailyFood"]);
    },
    onError: (error) => {
      console.log("음식 수정 실패", error);
    },
  });
};

export const useDeleteDailyFood = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ foodId }) => {
      return await deleteDailyFood(foodId);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["dailyFood"]);
      console.log("음식 삭제 성공", data);
    },
    onError: (error) => {
      console.log("음식 삭제 실패", error);
    },
  });
};

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
import { toast } from "../../components/shared/Toast/Toast";

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
      toast('푸드 생성 성공')
    },
  });
};

export const useUpdateFood = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateFoodApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["food"] });
      toast('푸드 수정 성공')
    },
  });
};

export const useDeleteFood = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteFoodApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["food"] });
      toast('푸드 삭제 성공')
    },
  });
};

export const useFoodSearch = (query, mealtype) => {
  return useQuery({
    queryKey: ["foodSearch", query, mealtype],
    queryFn: () => getFoodSearchResult(query, mealtype),
    enabled: query !== null,
    onError: (error) =>
      console.log("검색한 음식을 불러오는 데 실패했습니다.", error),
    
  });
};

export const useFoodPage = (query) => {
  return useQuery({
    queryKey: ["dailyFood", query],
    queryFn: () => getDailyFood(query),
    onError: (data) => {
      toast('페이지 불러오기에 실패하였습니다', { status : 'fail'})
      console.log("FoodPage 불러오기 실패", data)
    } 
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
      toast('음식 추가 성공')
    },
    onError: (error) => {
      console.log("음식 추가 실패", error);
      toast('음식 추가 실패', { status : 'fail'})
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
      toast('음식 수정 성공')
    },
    onError: (error) => {
      console.log("음식 수정 실패", error);
      toast('음식 수정 실패', { status : 'fail'})

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
      toast('음식 삭제 성공')
    },
    onError: (error) => {
      console.log("음식 삭제 실패", error);
      toast('음식 삭제 실패', { status : 'fail'})
    },
  });
};

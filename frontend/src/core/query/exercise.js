import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
  updateExerciseApi,
  createExerciseApi,
  deleteExerciseApi,
  getAllExerciseApi,
  getExerciseApi,
  addDailyExercise,
  getSearchExercise,
  getDailyExercise,
  updateDailyExercise,
} from "../api/exercise";
import { DatasetController } from "chart.js";

export const useGetAllExercise = (query) => {
  return useQuery({
    queryKey: ["exercise", query],
    queryFn: () => getAllExerciseApi(query),
  });
};

export const useGetExercise = (id) => {
  return useQuery({
    queryKey: ["exercise", id],
    queryFn: () => getExerciseApi(id),
  });
};

export const useCreateExercise = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createExerciseApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exercise"] });
    },
  });
};

export const useUpdateExercise = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateExerciseApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exercise"] });
    },
  });
};

export const useDeleteExercise = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteExerciseApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exercise"] });
    },
  });
};

//데일리
export const useGetDailyExercise = (date) => {
  return useQuery({
    queryKey: ["dailyExercise", date],
    queryFn: () => getDailyExercise(date),
  });
};

export const useGetSearchedExercise = (query, date) => {
  return useQuery({
    queryKey: ["exercise", query, date],
    queryFn: () => getSearchExercise(query, date),
  });
};

export const useAddDailyExercise = () => {
  const navigate = useNavigate();
  // const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ exercise, quantity, date }) =>
      addDailyExercise(exercise, quantity, date),
    onSuccess: () => {
      navigate("/exercise");
      // queryClient.invalidateQueries({});
    },
  });
};

export const useUpdateDailyExercise = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ quantity, exerciseId }) => {
      console.log("시간!!!", quantity);
      console.log("운동아이디", exerciseId);
      return await updateDailyExercise(quantity, exerciseId);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["dailyExercise"], data });
    },
  });
};

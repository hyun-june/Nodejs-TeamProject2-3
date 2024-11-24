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
  deleteDailyExercise,
} from "../api/exercise";
import { toast } from "../../components/shared/Toast/Toast";

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
      toast('운동 생성 성공')
    },
  });
};

export const useUpdateExercise = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateExerciseApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exercise"] });
      toast('운동 수정 성공')
    },
  });
};

export const useDeleteExercise = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteExerciseApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exercise"] });
      toast('운동 삭제 성공')
    },
  });
};

//데일리
export const useGetDailyExercise = (date) => {
  return useQuery({
    queryKey: ["dailyExercise", date],
    queryFn: () => getDailyExercise(date),
    enabled: !!date, // date가 유효한 경우에만 요청 발생
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
  const queryClient = useQueryClient(); // queryClient 활성화

  return useMutation({
    mutationFn: ({ exercise, quantity, date }) =>
      addDailyExercise(exercise, quantity, date),
    onSuccess: (_, { date }) => {
      console.log("Invalidating queries for date:", date); // 로그 추가

      queryClient.invalidateQueries({ queryKey: ["dailyExercise", date] }); // 날짜 기반 쿼리 무효화
      // 필요한 모든 작업이 끝난 후 navigate 호출
      toast('운동 추가 성공')
      setTimeout(() => {
        navigate(`/exercise?date=${date}`);
      }, 100); // 잠시 기다린 후 이동
    },
  });
};

// export const useAddDailyExercise = () => {
//   const navigate = useNavigate();

//   return useMutation({
//     mutationFn: ({ exercise, quantity, date }) =>
//       addDailyExercise(exercise, quantity, date),
//     onSuccess: () => {
//       navigate("/exercise");
//     },
//   });
// };

export const useUpdateDailyExercise = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ quantity, exerciseId }) => {
      return await updateDailyExercise(quantity, exerciseId);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["dailyExercise"], data });
      toast('운동 업데이트 성공')
    },
  });
};

export const useDeleteDailyExercise = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ exerciseId }) => {
      return await deleteDailyExercise(exerciseId);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["dailyExercise"], data });
      toast('운동 삭제 성공')
    },
  });
};

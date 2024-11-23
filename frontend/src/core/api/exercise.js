import { api } from "./api";

export const getAllExerciseApi = async (query) => {
  try {
    const { data } = await api.get(`/exercise`, { params: { ...query } });
    return data;
  } catch (error) {
    console.error("Error fetching exercise data:", error);
  }
};
export const getExerciseApi = async (id) => {
  try {
    const { data } = await api.get(`/exercise/${id}`);
    return data;
  } catch (error) {
    console.error("Error fetching exercise data:", error);
  }
};

export const createExerciseApi = async (formData) => {
  try {
    const { data } = await api.post(`/exercise`, formData);
    return data;
  } catch (error) {
    console.error("Error create exercise data:", error);
  }
};

export const updateExerciseApi = async (formData) => {
  try {
    const { data } = await api.put(`/exercise/${formData.id}`, formData);
    return data;
  } catch (error) {
    console.error("Error create exercise data:", error);
  }
};

export const deleteExerciseApi = async (id) => {
  try {
    const { data } = await api.delete(`/exercise/${id}`);
    return data;
  } catch (error) {
    console.error("Error create exercise data:", error);
  }
};

export const getSearchExercise = async (query, date) => {
  try {
    const { data } = await api.get(`/exercise/search`, {
      params: { q: query, date },
    });
    return data;
  } catch (error) {
    console.error("Error fetching exercise data:", error);
    return null;
  }
};

export const getDailyExercise = async (date) => {
  try {
    const { data } = await api.get("/exercise/daily", { params: { date } });
    const { data: dailyExercise, weight } = data; // data 안에서 dailyExercise와 weight 분리
    return { dailyExercise, weight }; // 분리된 데이터 반환
  } catch (error) {
    console.error("운동 불러오기 실패:", error);
  }
};

export const addDailyExercise = async (exercise, quantity, date) => {
  try {
    const { data } = await api.post(
      `/exercise/daily`,
      {
        exercise,
        quantity,
      },
      {
        params: { date },
      }
    );
    return data;
  } catch (error) {
    console.error("운동 추가 실패 에러 :", error);
  }
};

export const updateDailyExercise = async (quantity, exerciseId) => {
  try {
    const { data } = await api.put(`/exercise/daily`, { quantity, exerciseId });
    return data;
  } catch (error) {
    console.error("운동 수정 실패", error);
  }
};

export const deleteDailyExercise = async (exerciseId) => {
  try {
    const { data } = await api.delete(`/exercise/daily`, {
      data: { exerciseId },
    });
    return data;
  } catch (error) {
    console.error("데일리 운동 삭제 중 에러:", error);
  }
};

import { api } from "./api";

export const getAllExerciseApi = async (query, date) => {
  try {
    const { data } = await api.get(`/exercise`, {
      params: { q: query, date },
    });
    console.log("데이타", data);
    return data;
  } catch (error) {
    console.error("Error fetching exercise data:", error);
    return null;
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

export const addDailyExercise = async (exercise, time, date) => {
  try {
    const { data } = await api.post(
      `/exercise/daily`,
      {
        exercise,
        time,
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

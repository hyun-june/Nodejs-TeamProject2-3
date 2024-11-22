import { api } from "./api"; 

export const getAllExerciseApi = async (query) => {
    try {
      const { data } = await api.get(`/exercise`, { params : { ...query }});
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
        const { data } = await api.post(`/exercise`, formData)
        return data
    } catch (error) {
      console.error("Error create exercise data:", error);
    }
};

export const updateExerciseApi = async (formData) => {
    try {
        const { data } = await api.put(`/exercise/${formData.id}`, formData)
        return data
    } catch (error) {
      console.error("Error create exercise data:", error);
    }
};

export const deleteExerciseApi = async (id) => {
    try {
        const { data } = await api.delete(`/exercise/${id}`)
        return data
    } catch (error) {
        console.error("Error create exercise data:", error);
    }
};
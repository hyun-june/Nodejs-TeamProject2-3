import { api } from "./api";

export const getdailyWeight = async (query) => {
    try {
        const { data } = await api.get(`/dailyWeight`, { params : { ...query }});
        return data;
    } catch (error) {
        console.error("Error fetching dailyWeight data:", error);
    }
};

export const updateDailyWeight = async (query) => {
    try {
        const { data } = await api.put(`/dailyWeight`, { ...query });
        return data;
    } catch (error) {
        console.error("Error fetching dailyWeight data:", error);
    }
};
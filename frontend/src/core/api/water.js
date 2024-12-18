import { api } from "./api";
import { urlParser } from "../utils/fn/urlParser";

export const getWaterAmount = async (date) => {
  try {
    const url = urlParser("/dailyWater", { date });
    const { data } = await api.get(url);
    return data;
  } catch (error) {
    console.error("물 섭취 정보 조회 실패", error);
  }
};

export const updateWaterAmount = async (date, amount) => {
  try {
    const url = urlParser("/dailyWater", { date });
    const { data } = await api.patch(url, { changeAmount: amount });
    return data;
  } catch (error) {
    console.error("물 섭취 정보 수정 실패", error);
  }
};

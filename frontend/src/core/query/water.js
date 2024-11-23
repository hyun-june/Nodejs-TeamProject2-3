import { useQuery } from "@tanstack/react-query";
import { getWaterAmount } from "../api/water";

export const useGetWaterAmount = (date) => {
  return useQuery({
    queryKey: ["waterAmount", date],
    queryFn: () => getWaterAmount(date),
    enabled: !!date,
  });
};

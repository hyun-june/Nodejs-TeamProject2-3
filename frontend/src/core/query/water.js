import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getWaterAmount, updateWaterAmount } from "../api/water";

export const useGetWaterAmount = (date) => {
  return useQuery({
    queryKey: ["waterAmount", date],
    queryFn: () => getWaterAmount(date),
    enabled: !!date,
  });
};

export const useUpdateWaterAmount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ date, amount }) => updateWaterAmount(date, amount),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["waterAmount", variables.date],
      });
    },
  });
};

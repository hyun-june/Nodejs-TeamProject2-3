import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getdailyWeight, updateDailyWeight } from "../api/dailyWeight";

export const useGetDailyWeight = (query) => {
    return useQuery({
        queryKey: ["dailyWeight", query],
        queryFn: () => getdailyWeight(query),
    });
};

export const useUpdateDailyWeight = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:  updateDailyWeight,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['dailyWeight'] });
        },
    });
};
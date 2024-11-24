import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getdailyWeight, updateDailyWeight } from "../api/dailyWeight";
import { toast } from "../../components/shared/Toast/Toast";

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
            toast('몸무게 수정 성공' ,{status : 'success'})
        },
    });
};
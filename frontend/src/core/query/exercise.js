import { useQuery, useMutation, useQueryClient  } from "@tanstack/react-query";
import { 
    updateExerciseApi,
    createExerciseApi,
    deleteExerciseApi,
    getAllExerciseApi,
    getExerciseApi
} from "../api/exercise";

export const useGetAllExercise = (query) => {
    return useQuery({
        queryKey : [ 'exercise', query ],
        queryFn : () => getAllExerciseApi(query)
    });
};

export const useGetExercise = (id) => {
    return useQuery({
        queryKey : [ 'exercise', id ],
        queryFn : () => getExerciseApi(id)
    });
};

export const useCreateExercise = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createExerciseApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['exercise'] });
        },
    });
};

export const useUpdateExercise = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateExerciseApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['exercise'] });
        },
    });
};

export const useDeleteExercise = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteExerciseApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['exercise'] });
        },
    });
};


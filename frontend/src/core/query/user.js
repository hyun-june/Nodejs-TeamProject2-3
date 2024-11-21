import { getMyInfo } from "../api/user";
import { useQuery } from "@tanstack/react-query";

export const useGetMyInfo = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: getMyInfo,
  });
};

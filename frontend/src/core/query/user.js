import { getMyInfo, getOtherInfo } from "../api/user";
import { useQuery } from "@tanstack/react-query";

export const useGetMyInfo = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: getMyInfo,
  });
};

export const useGetOtherInfo = (id) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => getOtherInfo(id),
  });
};

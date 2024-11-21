import { useQuery } from "@tanstack/react-query";
import { getFoodSearchResult } from "../api/food";

export const useFoodSearch = (query) => {
  console.log("Query received:", query); // query 값이 제대로 전달되는지 확인

  return useQuery({
    queryKey: ["foodSearch", query],
    queryFn: () => getFoodSearchResult(query),
    onSuccess: (data) =>
      console.log("검색한 음식을 불러오는 데 성공했습니다.", data),
    onError: (error) =>
      console.log("검색한 음식을 불러오는 데 실패했습니다.", error),
    enabled: !!query, // query가 있을 때만 실행
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
};

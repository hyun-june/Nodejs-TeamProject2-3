import { useInfiniteQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { createFeed, getFeed } from "../api/feed";
import { useNavigate } from "react-router-dom";

export const useCreateFeed = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ fileUrl, description, hashtags }) =>
      createFeed({ fileUrl, description, hashtags }),
    onSuccess: (data) => {
      navigate("/feed");
      console.log("피드 생성 성공", data);
    },
    onError: (error) => {
      console.log("피드 생성 실패", error);
    },
  });
};

export const useGetAllFeed = () => {
  return useInfiniteQuery({
    queryKey: ["AllFeed"],
    queryFn: ({ pageParam = 1 }) => {
      return getFeed(pageParam);
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,

    onSuccess: (data) => {
      console.log("피드 로드 성공", data);
    },
    onError: (error) => {
      console.log("피드 로드 실패", error);
    },
  });
};

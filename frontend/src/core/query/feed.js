import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";

import {
  createFeed,
  getDetailFeed,
  getFeed,
  updateComments,
  getAllFeedApi,
  deleteFeedApi
} from "../api/feed";
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

export const useGetAllFeedInfinite = ({ limit }) => {
  return useInfiniteQuery({
    queryKey: ["AllFeedInfi"],
    queryFn: ({ pageParam = 1 }) => {
      return getFeed(pageParam, limit);
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

export const useGetAllFeed = (query) => {
  return useQuery({
      queryKey : [ 'feed', query ],
      queryFn : () => getAllFeedApi(query)
  });
};

export const useGetDetailFeed = (id) => {
  return useQuery({
    queryKey: ["DetailFeed", id],
    queryFn: () => getDetailFeed(id),
  });
};

export const useUpdateComment = ({ id }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, newCommentText }) =>
      updateComments({ id, newCommentText }),
    onSuccess: (data) => {
      queryClient.invalidateQueries("DetailFeed");
      console.log("댓글 생성 성공", data);
    },
    onError: (error) => {
      console.log("댓글 생성 실패", error);
    },
  });
};

export const useDeleteFeed = () => {
  const queryClient = useQueryClient();
  return useMutation({
      mutationFn: deleteFeedApi,
      onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['feed'] });
      },
  });
};
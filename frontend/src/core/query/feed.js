import { useInfiniteQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { createFeed } from "../api/feed";
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

const useGetTest = async (page) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/top_rated?page=${page}`,
    {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNjI4OWI3ODkxZmRiMmZjM2ZiOTljNmVkODZkMmM0ZCIsIm5iZiI6MTczMjA5MjUyMy4wOTg2MzExLCJzdWIiOiI2Njc3ZDFmN2YzYjM2MTZjOWYyMzQ0NWUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.WqcgZMONVICOOWhc7Y_z909OdGOWt39sd8PGSdtFsf4",
      },
    }
  );
  return response.json();
};

export const useGetTestAll = () => {
  return useInfiniteQuery({
    queryKey: ["feed"],
    queryFn: ({ pageParam }) => {
      return useGetTest(pageParam);
    },
    getNextPageParam: (last) => {
      if (last.page < last.total_pages) {
        return last.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });
};

// const useGetFeed = async (page) => {
//     const response = await fetch(
//       `https://api.themoviedb.org/3/movie/top_rated?page=${page}`,
//       {
//         headers: {
//           Authorization:
//             "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNjI4OWI3ODkxZmRiMmZjM2ZiOTljNmVkODZkMmM0ZCIsIm5iZiI6MTczMjA5MjUyMy4wOTg2MzExLCJzdWIiOiI2Njc3ZDFmN2YzYjM2MTZjOWYyMzQ0NWUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.WqcgZMONVICOOWhc7Y_z909OdGOWt39sd8PGSdtFsf4",
//         },
//       }
//     );
//     return response.json();
//   };

//   export const useGetAll = () => {
//     return useInfiniteQuery({
//       queryKey: ["feed"],
//       queryFn: ({ pageParam }) => {
//         return useGetFeed(pageParam);
//       },
//       getNextPageParam: (last) => {
//         if (last.page < last.total_pages) {
//           return last.page + 1;
//         }
//         return undefined;
//       },
//       initialPageParam: 1,
//     });
//   };

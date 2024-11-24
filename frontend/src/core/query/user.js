import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
  getMyInfo,
  getOtherInfo,
  getUserDetail,
  updateUserDetail,
} from "../api/user";
import { toast } from "../../components/shared/Toast/Toast";

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

export const useGetUserDetail = () => {
  return useQuery({
    queryKey: ["myDetail"],
    queryFn: getUserDetail,
  });
};

export const useUpdateUserDetail = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (formData) => {
      console.log("폼 데이터", formData);
      return await updateUserDetail(formData);
    },
    onSuccess: (data) => {
      navigate("/user/me");
      toast('정보 수정 성공!')
    },
  });
};

"use client";

import http from "@/utils/interceptor";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

export const deleteBlog = async (id: string | number) => {
  const response = await http.delete(`/blogs/${id}`);
  return response.data;
};

export const useDeleteBlog = (onSuccess?: () => void) => {
  return useMutation({
    mutationKey: ["DELETE_BLOG"],
    mutationFn: deleteBlog,
    retry: 0,
    onSuccess: () => {
      toast.success("بلاگ با موفقیت حذف شد");
      if (onSuccess) onSuccess();
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 400) {
        toast.error("درخواست نامعتبر بود.");
      } else if (error.response?.status && error.response.status >= 500) {
        toast.error("خطای سرور رخ داده است. لطفا بعدا تلاش کنید.");
      } else {
        toast.error("حذف بلاگ با خطا مواجه شد");
      }
    },
  });
};

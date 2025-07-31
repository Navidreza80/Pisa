"use client";

import http from "@/utils/interceptor";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

export interface BlogPutPayload {
  id: number; 
  title: string;
  caption: string;
  estimated_reading_time: string; 
  author_id: string;
  category_id: string;
}

export const sendBlogPut = async (data: BlogPutPayload) => {
  const { id, ...payload } = data;
  return http.put(`/blogs/${id}`, payload);
};

const usePutBlog = (onSuccess?: () => void) => {
  return useMutation({
    mutationKey: ["PUT_BLOG"],
    mutationFn: sendBlogPut,
    retry: 0,
    onSuccess: () => {
      toast.success("مقاله با موفقیت ویرایش شد.");
      if (onSuccess) onSuccess();
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 400) {
        toast.error("اطلاعات ارسالی نامعتبر است.");
      } else if (error.response?.status && error.response.status >= 500) {
        toast.error("خطای سرور رخ داده است. لطفا بعدا تلاش کنید.");
      } else {
        toast.error("ویرایش با خطا مواجه شد.");
      }
    },
  });
};

export default usePutBlog;

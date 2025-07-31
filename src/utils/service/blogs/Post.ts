"use client";

import http from "@/utils/interceptor";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

export interface BlogPostPayload {
  title: string;
  caption: string;
  estimated_reading_time: string; 
  author_id: string;
  category_id: string;
}

export const sendBlogPost = async (data: BlogPostPayload) => {
  return http.post("/blogs", data);
};

const usePostBlog = (onSuccess?: () => void) => {
  return useMutation({
    mutationKey: ["POST_BLOG"],
    mutationFn: sendBlogPost,
    retry: 0,
    onSuccess: () => {
      toast.success("مقاله با موفقیت ارسال شد.");
      if (onSuccess) onSuccess();
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 400) {
        toast.error("اطلاعات ارسالی نامعتبر است.");
      } else if (error.response?.status && error.response.status >= 500) {
        toast.error("خطای سرور رخ داده است. لطفا بعدا تلاش کنید.");
      } else {
        toast.error("ارسال با خطا مواجه شد.");
      }
    },
  });
};

export default usePostBlog;

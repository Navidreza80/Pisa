// Dependencies
import { AxiosResponse } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

// Interceptor
import http from "@/utils/interceptor";

// Types
import type { CommentResponse, PostCommentParams } from "@/types/comments";

/**
 * Post comment to server.
 * @param {PostCommentParams} params
 * @returns response with comment
 */

export const postComment = async (
  params: PostCommentParams
): Promise<AxiosResponse<CommentResponse>> => {
  const response = await toast.promise(
    http.post(`/houses/${params.houseId}/comments`, {
      title: params.title,
      caption: params.caption,
      rating: params.rating,
      parent_comment_id: params.parent_comment_id,
    }),
    {
      pending: "درحال ارسال نظر...",
      success: "نظر شما با موفقیت ثبت شد!",
      error: "خطا در ارسال نظر",
    }
  );
  return response;
};

export const usePostComment = () => {
  const queryClient = useQueryClient();

  return useMutation<AxiosResponse<CommentResponse>, Error, PostCommentParams>({
    mutationFn: postComment,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["comments", variables.houseId],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

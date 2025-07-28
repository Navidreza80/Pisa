"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import http from "@/utils/interceptor";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";

export const sendForgotPasswordEmail = async (params: { email: string }) => {
  return http.post("/auth/forgot-password/request", {
    email: params.email,
  });
};

export const useForgotPasswordRequest = () => {
  const router = useRouter();
  const t = useTranslations("Auth");

  return useMutation({
    mutationKey: ["FORGOT_PASSWORD_REQUEST"],
    mutationFn: sendForgotPasswordEmail,
    retry: 0,
    onSuccess: () => {
      toast.success(t("resetCodeSent")); 
      router.push("/auth/reset-password/code");
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 404) {
        toast.error(t("emailNotFound"));
      } else if (error.response?.status && error.response.status >= 500) {
        toast.error(t("serverError"));
      } else {
        toast.error(t("genericError"));
      }
    },
  });
};

"use client";

import http from "@/utils/interceptor";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

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
    onSuccess: (_, variables) => {
      localStorage.setItem("resetEmail", variables.email); 
      toast.success(t("FP_resetCodeSent"));
      router.push("/auth/forget-password/step-2"); 
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 404) {
        toast.error(t("FP_emailNotFound"));
      } else if (error.response?.status && error.response.status >= 500) {
        toast.error(t("FP_serverError"));
      } else {
        toast.error(t("FP_genericError"));
      }
    },
  });
};

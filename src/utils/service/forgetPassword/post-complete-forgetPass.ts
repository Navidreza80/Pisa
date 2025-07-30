"use client";

import http from "@/utils/interceptor";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface ResetPasswordParams {
  email: string;
  resetCode: string;
  newPassword: string;
}

interface ResetPasswordResponse {
  message?: string;
}

const resetPassword = async (params: ResetPasswordParams) => {
  const response = await http.post<ResetPasswordResponse>(
    "/auth/forgot-password/reset",
    params
  );

  return response.data;
};

export const useResetPassword = () => {
  const router = useRouter();
  const t = useTranslations("Auth");

  return useMutation({
    mutationKey: ["RESET_PASSWORD"],
    mutationFn: resetPassword,
    retry: 0,
    onSuccess: () => {
      toast.success(t("FP_success"));
      router.push("/");
    },
    onError: (error: AxiosError) => {
      console.error("[useResetPassword] error:", error);

      if (error.response?.status && error.response.status >= 500) {
        toast.info(t("FP_serverError"));
      } else if (error.response?.status === 400) {
        toast.error(t("FP_invalidCode"));
      } else {
        toast.error(t("FP_genericError"));
      }
    },
  });
};

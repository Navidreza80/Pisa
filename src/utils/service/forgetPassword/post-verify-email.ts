"use client";

import http from "@/utils/interceptor";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface VerifyResetCodeParams {
  email: string;
  resetCode: string;
}

interface VerifyResetCodeResponse {
  token: string;
}

const verifyResetCode = async ({ email, resetCode }: VerifyResetCodeParams) => {
  const body = {
    email,
    resetCode: resetCode,
  };

  const response = await http.post<VerifyResetCodeResponse>(
    "/auth/forgot-password/verify",
    body
  );

  return response.data;
};

export const useVerifyResetCode = () => {
  const router = useRouter();
  const t = useTranslations("Auth");

  return useMutation({
    mutationKey: ["VERIFY_RESET_CODE"],
    mutationFn: verifyResetCode,
    retry: 0,
    onSuccess: (data, variables) => {
      localStorage.setItem("resetCode", variables.resetCode);
      toast.success(t("FP_successCode"));
      router.push("/auth/forget-password/step-3");
    },

    onError: (error: AxiosError) => {
      if (error.response?.status === 400) {
        toast.error(t("FP_invalidCode"));
      } else if (error.response?.status && error.response.status >= 500) {
        toast.error(t("FP_serverError"));
      } else {
        toast.error(t("FP_genericError"));
      }
    },
  });
};

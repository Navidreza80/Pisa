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

const verifyResetCode = async (params: VerifyResetCodeParams) => {
  console.log("[verifyResetCode] sending params:", params);
  const response = await http.post<VerifyResetCodeResponse>("/auth/forgot-password/verify", params);
  console.log("[verifyResetCode] response:", response.data);
  return response;
};

export const useVerifyResetCode = () => {
  const router = useRouter();
  const t = useTranslations("Auth");



  return useMutation({
    mutationKey: ["VERIFY_RESET_CODE"],
    mutationFn: verifyResetCode,
    retry: 0,
    onSuccess: (response) => {
      console.log("[useVerifyResetCode] success:", response.data);
      toast.success(t("successCode"));
      router.push("/auth/forget-password/step-3");
    },
    onError: (error: AxiosError) => {
      console.error("[useVerifyResetCode] error:", error);

      if (error.response?.status === 400) {
        toast.error(t("invalidCode"));
      } else if (error.response?.status && error.response.status >= 500) {
        toast.error(t("serverError"));
      } else {
        toast.error(t("genericError"));
      }
    },
  });
};

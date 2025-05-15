"use client";

// Next Js
import { useRouter } from "next/navigation";

// Types
import type { VerifyEmailParams, VerifyEmailResponse } from "@/types/auth";

// Interceptor
import http from "@/utils/interceptor";

// Dependencies
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";

// Constant
import { ROUTES } from "@/utils/constant/routes";

/**
 * Verifies an email address by sending a verification code to the server.
 * @param params - The email and verification code
 * @returns Axios response with verification result
 */
export const verifyEmail = async (
  params: VerifyEmailParams
): Promise<AxiosResponse<VerifyEmailResponse>> => {
  return http.post("/auth/verify-email", params);
};

/**
 * React Query hook for verifying an email address.
 * Shows toast notifications and redirects on success.
 * @returns Mutation hook for email verification
 */
export const useVerifyEmail = () => {
  // Hooks
  const router = useRouter();
  const t = useTranslations("Auth");

  const { REGISTER_STEP_3 } = ROUTES;

  return useMutation({
    mutationKey: ["VERIFY_EMAIL"],
    mutationFn: (params: VerifyEmailParams) =>
      toast.promise(verifyEmail(params), {
        pending: t("pending"),
      }),
    retry: 0,
    onSuccess: async () => {
      toast.success(t("successEmail"));
      router.push(REGISTER_STEP_3);
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 400) {
        toast.error(t("invalidCode"));
      } else if (error.response?.status && error.response.status >= 500) {
        toast.info(t("serverError"));
      } else {
        toast.error(t("genericError"));
      }
    },
  });
};

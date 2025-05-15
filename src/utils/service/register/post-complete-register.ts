"use client";
// Types
import type {
  CompleteRegisterParams,
  CompleteRegisterResponse,
} from "@/types/auth";

// Next
import { useRouter } from "next/navigation";

// Interceptor
import http from "@/utils/interceptor";

// Dependencies
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

// Constant
import { ROUTES } from "@/utils/constant/routes";
import { useTranslations } from "next-intl";

/**
 * Completes user registration process vt getting phone number and password.
 * @param params - phone number, email
 * @returns response with complete registration process
 */
export const CompleteRegisterUser = async (
  params: CompleteRegisterParams
): Promise<CompleteRegisterResponse> => {
  return http.post("/auth/complete-registration", params);
};

/**
 * React Query hook for complete user register.
 * Shows toast notifications and redirects on success.
 * @returns Mutation hook for complete user registration process.
 */
export const useCompleteRegister = () => {
  // Hooks
  const router = useRouter();
  const { LOGIN } = ROUTES;
  const t = useTranslations("Auth");

  return useMutation({
    mutationKey: ["REGISTER_USER"],
    mutationFn: (params: CompleteRegisterParams) =>
      toast.promise(CompleteRegisterUser(params), {
        pending: t("pending"),
      }),
    retry: 0,
    onSuccess: async () => {
      toast.success(t("success"));
      router.push(LOGIN);
    },
    onError: (error: AxiosError) => {
      if (error.response?.status && error.response.status >= 500) {
        toast.info(t("serverError"));
      } else {
        toast.error(t("genericError"));
      }
    },
  });
};

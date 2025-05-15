"use client";
// Next
import { useRouter } from "next/navigation";

// Types
import type {
  StartRegisterUserParams,
  StartRegisterUserResponse,
} from "@/types/auth";

// Interceptor
import http from "@/utils/interceptor";

// Dependencies
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";

// Cookies
import { setClientCookie } from "../storage/client-cookie";
import { ROUTES } from "@/utils/constant/routes";

/**
 * Starts register user by getting the email .
 * @param params - email
 * @returns response with register user result
 */
export const startRegisterUser = async (
  params: StartRegisterUserParams
): Promise<StartRegisterUserResponse> => {
  return http.post("/auth/start-registration", params);
};

/**
 * React Query hook for start registering user.
 * Shows toast notifications and redirects on success.
 * @returns Mutation hook for start registering user.
 */
export const useStartRegister = () => {
  // Hooks
  const router = useRouter();
  const t = useTranslations("Auth");
  const { REGISTER_STEP_2 } = ROUTES;

  return useMutation({
    mutationKey: ["START_REGISTER_USER"],
    mutationFn: (params: StartRegisterUserParams) =>
      toast.promise(startRegisterUser(params), {
        pending: t("pending"),
      }),
    retry: 0,
    onSuccess: async (response: StartRegisterUserResponse) => {
      toast.success(t("successEmail"));
      setClientCookie("userId", response.tempUserId, 15);
      router.push(REGISTER_STEP_2);
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 400) {
        toast.error(t("emailExists"));
      } else if (error.response?.status && error.response.status >= 500) {
        toast.info(t("serverError"));
      } else {
        toast.error(t("genericError"));
      }
    },
  });
};

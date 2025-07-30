/* eslint-disable */

import { loginUserResponse } from "./../../../types/auth/index";
// Types
import type { loginUserParams } from "@/types/auth";

// Interceptor
import http from "@/utils/interceptor";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

// Cookies
import { setClientCookie } from "@/utils/service/storage/client-cookie";
import { setServerCookie } from "@/utils/service/storage/server-cookie";

// Next
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

/**
 * Login email by posting email and password to server.
 * @param params - The email and password
 * @returns Login user response
 */
export const LoginUser = async (
  params: loginUserParams
): Promise<loginUserResponse> => {
  return http.post("/auth/login", params);
};

/**
 * React Query hook for user login process.
 * Shows toast notifications and redirects on success.
 * @returns Mutation hook for checking email and password.
 */
export const useLoginUser = (href: string = "/") => {
  // Hooks
  const router = useRouter();
  const t = useTranslations("Auth");
  return useMutation({
    mutationKey: ["LOGIN_USER"],
    mutationFn: (params: loginUserParams) =>
      toast.promise(LoginUser(params), {
        pending: t("pending"),
      }),
    onSuccess: async (response: loginUserResponse) => {
      toast.success(t("loginSuccess"));
      await setServerCookie("serverAccessToken", response.accessToken);
      await setServerCookie("serverRefreshToken", response.refreshToken);
      setClientCookie("clientAccessToken", response.accessToken);
      handleSaveId(response.accessToken);
      router.push(href);
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 400) {
        toast.error(t("wrongPassword"));
      } else if (error.response?.status && error.response.status >= 500) {
        toast.info(t("serverError"));
      } else {
        toast.error(t("genericError"));
      }
    },
  });
};

const handleSaveId = (token: string) => {
  const decoded: any = typeof token == "string" && jwtDecode(token);
  setServerCookie("userId", decoded.id);
  setClientCookie("clientUserId", decoded.id);
};

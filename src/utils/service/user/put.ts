"use client";

// Interceptor
import http from "@/utils/interceptor";
import { useMutation } from "@tanstack/react-query";

// Cookies
import { getClientCookie } from "@/utils/service/storage/client-cookie";

// Next
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

/**
 * Login email by posting email and password to server.
 * @param params - The email and password
 * @returns Login user response
 */
export const EditUserInfo = async (id, params) => {
  try {
    const result = await http.put(`/users/${id}`, params);
    return result;
  } catch (e) {
    return e;
  }
};

/**
 * React Query hook for user login process.
 * Shows toast notifications and redirects on success.
 * @returns Mutation hook for checking email and password.
 */
export const useEditUser = () => {
  const token = getClientCookie("clientAccessToken");
  const decoded = typeof token == "string" && jwtDecode(token);
  return useMutation({
    mutationKey: ["EDIT_INFORMATION"],
    mutationFn: (params) => {
      EditUserInfo(decoded.id, params);
    },
    onMutate: () => {
      toast.info("درحال پردازش", {
        toastId: "edit-info-loading",
      });
    },
    onSuccess: () => {
      toast.dismiss("edit-info-loading");
      toast.success("اطلاعات با موفقیت ویرایش شد");
    },
    onError: () => {
      toast.dismiss("edit-info-loading");
      toast.error("خطایی رخ داد. لطفا دوباره تلاش کنید");
    },
  });
};

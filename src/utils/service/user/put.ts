"use client"

// Interceptor
import http from "@/utils/interceptor";
import { useMutation } from "@tanstack/react-query";

// Cookies
import {
    getClientCookie
} from "@/utils/service/storage/client-cookie";

// Next
import { jwtDecode } from "jwt-decode";

/**
 * Login email by posting email and password to server.
 * @param params - The email and password
 * @returns Login user response
 */
export const EditUserInfo = async (id, params) => {
  return http.put(`/users/62`, params);
};

/**
 * React Query hook for user login process.
 * Shows toast notifications and redirects on success.
 * @returns Mutation hook for checking email and password.
 */
export const useEditUser = () => {
  const token = getClientCookie("clientAccessToken");
  const { id } = typeof token == "string" && jwtDecode(token);
  return useMutation({
    mutationKey: ["EDIT_INFORMATION"],
    mutationFn: (params) => {
      EditUserInfo(id, params);
    },
  });
};

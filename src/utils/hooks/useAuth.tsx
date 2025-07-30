"use client";

import { toast } from "react-toastify";
import { getClientCookie } from "../service/storage/client-cookie";

const useAuth = () => {
  const token = getClientCookie("clientAccessToken");
  const isLoggedIn = !!token;
  return { token, isLoggedIn };
};
export default useAuth;

export const useHandleAuth = () => {
  const { isLoggedIn } = useAuth();
  const handler = (action) => {
    if (!isLoggedIn) {
      toast.error("لطفا ابتدا وارد حساب کاربری خود شوید");
    } else {
      action();
    }
  };

  return { handler };
};

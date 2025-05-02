"use client";
import {
  StartRegisterUserParams,
  StartRegisterUserResponse,
} from "@/types/auth";
import http from "@/utils/interceptor";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { setClientCookie } from "../storage/client-cookie";

export const startRegisterUser = async (
  params: StartRegisterUserParams
): Promise<StartRegisterUserResponse> => {
  const response = await toast.promise(
    http.post("/auth/start-registration", params),
    {
      pending: "درحال پردازش...",
    }
  );
  return response;
};

export const useStartRegister = () => {
  const router = useRouter();
  return useMutation({
    mutationKey: ["REGISTER_USER"],
    mutationFn: startRegisterUser,
    onSuccess: async (response: StartRegisterUserResponse) => {
      toast.success("کد تایید با موفقیت ارسال شد!");
      setClientCookie("userId", response.tempUserId, 15)
      router.push("/auth/register/step-2");
    },
    onError: (error: AxiosError) => {
      if (error.status === 400) toast.error("این ایمیل قبلا ثبت نام شده است!");
      else if (error.status && error.status >= 500)
        toast.info("برای سرور مشکلی پیش آمده لطفا بعدا تلاش کنید!");
    },
  });
};

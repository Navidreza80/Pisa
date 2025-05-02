"use client";
import { VerifyEmailParams, VerifyEmailResponse } from "@/types/auth";
import http from "@/utils/interceptor";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export const verifyEmail = async (
  params: VerifyEmailParams
): Promise<AxiosResponse<VerifyEmailResponse>> => {
  const response = await toast.promise(
    http.post("/auth/verify-email", params),
    {
      pending: "درحال پردازش...",
    }
  );
  return response;
};

export const useVerifyEmail = () => {
  const router = useRouter();

  return useMutation({
    mutationKey: ["REGISTER_USER"],
    mutationFn: verifyEmail,
    onSuccess: async () => {
      toast.success("ایمیل با موفقیت تایید شد!");
      router.push("/auth/register/step-3");
    },
    onError: (error: AxiosError) => {
      if (error.status === 400) toast.error("کد تایید اشتباه میباشد!");
      else if (error.status && error.status >= 500)
        toast.info("برای سرور مشکلی پیش آمده لطفا بعدا تلاش کنید!");
    },
  });
};

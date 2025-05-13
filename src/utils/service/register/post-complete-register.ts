"use client";
import { CompleteRegisterParams, CompleteRegisterResponse } from "@/types/auth";
import http from "@/utils/interceptor";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export const CompleteRegisterUser = async (
  params: CompleteRegisterParams
): Promise<AxiosResponse<CompleteRegisterResponse>> => {
  const response = await toast.promise(
    http.post("/auth/complete-registration", params),
    {
      pending: "درحال پردازش...",
    }
  );
  return response;
};

export const useCompleteRegister = () => {
  const router = useRouter();
  return useMutation({
    mutationKey: ["REGISTER_USER"],
    mutationFn: CompleteRegisterUser,
    onSuccess: async () => {
      toast.success("ثبت نام با موفقیت انجام شد!");
      router.push("/auth/login");
    },
    onError: (error: AxiosError) => {
      if (error.status && error.status >= 500)
        toast.info("برای سرور مشکلی پیش آمده لطفا بعدا تلاش کنید!");
    },
  });
};

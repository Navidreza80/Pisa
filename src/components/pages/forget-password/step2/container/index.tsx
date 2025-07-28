"use client";

import { useState, useEffect } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useFormik } from "formik";
import { useTranslations } from "next-intl";
import Button from "@/components/common/auth/button";
import LogoSVGClient from "@/components/common/svg/logo-client";
import TimerSVG from "@/components/common/svg/timer";
import * as Yup from "yup";
import { useVerifyResetCode } from "@/utils/service/forgetPassword/post-verify-email";

export default function ForgetPasswordStep2() {
  const t = useTranslations("Auth");
  const [timer, setTimer] = useState(80);

  const email = typeof window !== "undefined" ? localStorage.getItem("resetEmail") : null;

  const verifyResetCodeMutation = useVerifyResetCode();

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const timerStr = `0${Math.floor(timer / 60)}:${(timer % 60)
    .toString()
    .padStart(2, "0")}`;

  const formik = useFormik({
    initialValues: {
      verificationCode: "",
    },
    validationSchema: Yup.object({
      verificationCode: Yup.string()
        .length(6, t("codeValidation"))
        .required(t("codeValidation")),
    }),
    onSubmit: (values) => {
      if (!email) {
        console.error("[ForgetPasswordStep2] Email not found in localStorage");
        return;
      }
      console.log("[ForgetPasswordStep2] Submitting code:", values.verificationCode);
      verifyResetCodeMutation.mutate({
        email,
        resetCode: values.verificationCode,
      });
    },
  });

  return (
    <div className="w-full flex flex-col gap-[32px]">
      <div>
        <LogoSVGClient />
      </div>

      <div>
        <h1 className="text-[36px] font-[700] text-black dark:text-white mb-[30px]">
          {t("ResetPassword")}
        </h1>
        <p className="text-[14px] font-[600] text-[#767676] dark:text-[#d1d1d1]">
          {t("ResetCodeDesc")}
        </p>
      </div>

      <form
        onSubmit={formik.handleSubmit}
        className="w-full flex flex-col items-center mt-4"
      >
        <span className="text-[14px] w-full font-[500] mb-[8px] text-[#222] dark:text-[#d1d1d1]">
          {t("VerificationCode")}
        </span>

        <div className="flex flex-row-reverse justify-center gap-3 mb-4">
          <InputOTP maxLength={6} onChange={(value) => formik.setFieldValue("verificationCode", value)}>
            <InputOTPGroup className="gap-2">
              {[...Array(6)].map((_, index) => (
                <InputOTPSlot
                  key={index}
                  index={index}
                  className="w-[55px] h-[55px] !rounded-2xl border-border shadow-none outline-none"
                />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </div>

        {formik.touched.verificationCode && formik.errors.verificationCode && (
          <span className="text-red-500 text-sm">{formik.errors.verificationCode}</span>
        )}

        <div className="flex items-center justify-between w-full mb-6 px-2">
          <span className="flex bg-[#586CFF30] dark:bg-[#586CFF80] gap-[12px] p-[8px] pl-[12px] rounded-[100px]">
            <TimerSVG />
            <p className="text-[#586CFF] text-[14px] font-bold my-auto dark:text-[#A9B8FF]">
              {timerStr}
            </p>
          </span>
        </div>

    
        <Button
          disabled={
            !formik.values.verificationCode ||
            formik.values.verificationCode.length !== 6 ||
            verifyResetCodeMutation.isLoading
          }
          text={verifyResetCodeMutation.isLoading ? t("Sending") : t("ُSend")}
          type="submit"
          className="w-full"
        />

        {verifyResetCodeMutation.isError && (
          <p className="text-red-500 mt-2 text-center">
            {verifyResetCodeMutation.error?.response?.data?.message ||
              t("genericError")}
          </p>
        )}
      </form>
    </div>
  );
}

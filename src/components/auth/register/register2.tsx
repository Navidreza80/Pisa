"use client";

import LogoSVGClient from "@/components/common/svg/logo-client";
import TimerSVG from "@/components/common/svg/timer";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useVerifyEmail } from "@/utils/service/register/post-verify-email";
import { getClientCookie } from "@/utils/service/storage/client-cookie";
import { useFormik } from "formik";
import { useTranslations } from "next-intl";
import { useState } from "react";
import Button from "../common/button";

export default function Register2() {
  const t = useTranslations("Auth");
  const [timer, setTimer] = useState(80);
  const [code, setCode] = useState();
  const { mutate } = useVerifyEmail();
  const userId = getClientCookie("userId")
  const formik = useFormik({
    initialValues: {
      tempUserId: null,
      verificationCode: "",
    },
    onSubmit: async () => {
      mutate({ verificationCode: code, tempUserId: Number(userId) });
    },
  });

  const timerStr = `0${Math.floor(timer / 60)}:${(timer % 60)
    .toString()
    .padStart(2, "0")}`;

  return (
    <div className="w-full flex flex-col gap-[32px]">
      <div dir="rtl">
        <LogoSVGClient />
      </div>
      <div dir="rtl">
        <h1 className="text-[36px] text-right font-[700] text-[#000000] dark:text-[#ffffff] mb-[30px]">
          {t("SignUpTitle")}
        </h1>
        <div className="text-[14px] text-right flex gap-[3px] font-[600] text-[#767676] dark:text-[#d1d1d1]">
          {t("SignUpDesc2")}
        </div>
      </div>

      <form
        className="w-full flex flex-col items-center mt-4"
        onSubmit={formik.handleSubmit}
      >
        <span className="text-[14px] w-full font-[500] mb-[8px] text-right text-[#222] dark:text-[#d1d1d1]">
          {t("VerificationCode")}
        </span>

        <div className="flex flex-row-reverse justify-center gap-3 mb-4">
          <InputOTP maxLength={6} onChange={(value) => setCode(value)}>
            <InputOTPGroup className="gap-2">
              <InputOTPSlot
                className="w-[55px] h-[55px] !rounded-2xl border-border shadow-none outline-none"
                index={0}
              />
              <InputOTPSlot
                className="w-[55px] h-[55px] !rounded-2xl border-border shadow-none outline-none"
                index={1}
              />
              <InputOTPSlot
                className="w-[55px] h-[55px] !rounded-2xl border-border shadow-none outline-none"
                index={2}
              />
              <InputOTPSlot
                className="w-[55px] h-[55px] !rounded-2xl border-border shadow-none outline-none"
                index={3}
              />
              <InputOTPSlot
                className="w-[55px] h-[55px] !rounded-2xl border-border shadow-none outline-none"
                index={4}
              />
              <InputOTPSlot
                className="w-[55px] h-[55px] !rounded-2xl border-border shadow-none outline-none"
                index={5}
              />
            </InputOTPGroup>
          </InputOTP>
        </div>

        <div
          dir="rtl"
          className="flex items-center justify-between w-full mb-6 px-2"
        >
          <span className="flex bg-[#586CFF30] dark:bg-[#586CFF80] gap-[12px] p-[8px] pl-[12px] rounded-[100px]">
            <TimerSVG />
            <p className="text-[#586CFF] font-yekannum text-[14px] font-bold my-auto dark:text-[#A9B8FF]">
              {timerStr}
            </p>
          </span>
        </div>
        <Button text={t("ُSend")} />
      </form>
    </div>
  );
}

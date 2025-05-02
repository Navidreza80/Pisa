"use client"
// Next built in components
import Link from "next/link";
// Third party components
import Button from "../common/button";
import InputAuth from "../common/input-auth";
import OrUnderline from "../common/or-underline";
import WelcomeTitle from "../common/welcome-title";
// SVGs
import EmailSVG from "@/components/common/svg/email";
import GoogleSVG from "@/components/common/svg/google";
import { useStartRegister } from "@/utils/service/register/post-step-one";
import { useFormik } from "formik";
import { useTranslations } from "next-intl";

function Register1() {
  const { mutate } = useStartRegister();
  const t = useTranslations("Auth");
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: async (value) => {
      mutate(value);
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <WelcomeTitle title={t("SignUpTitle")} desc={t("SignUpDesc1")} />
      <div className="flex flex-col flex-wrap gap-[24px]">
        <button className="h-[48px] text-text border border-[#E0E0E0] rounded-2xl flex items-center justify-center gap-2 text-[16px] font-bold cursor-pointer transition-all dark:bg-white">
          <h1>ثبت نام در پیزا با گوگل</h1>
          <GoogleSVG />{" "}
        </button>
        <OrUnderline />
        <InputAuth
          text={t("email")}
          id="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          type="email"
          placeHolder={t("emailDesc")}
          icon={<EmailSVG />}
        />
          <Button text="ثبت نام"/>
      </div>

      <div className="flex justify-center mt-2 gap-[5px]">
        <span className="text-[14px] font-[500] underline text-[#586CFF] dark:text-[#8b9bff]">
          {t("loginAccount")}
        </span>
        <span className="text-[14px] font-[500] text-[#222] dark:text-[white]">
          {t("HaveAccount")}
        </span>
      </div>
    </form>
  );
}

export default Register1;

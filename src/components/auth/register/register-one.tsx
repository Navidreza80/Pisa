"use client";
// Dependencies
import { useFormik } from "formik";
import { useTranslations } from "next-intl";
import * as Yup from "yup";

// Third party components
import Button from "../common/button";
import InputAuth from "../common/input-auth";
import OrUnderline from "../common/or-underline";
import WelcomeTitle from "../common/welcome-title";

// SVGs
import EmailSVG from "@/components/common/svg/email";
import GoogleSVG from "@/components/common/svg/google";

// API
import { useStartRegister } from "@/utils/service/register/post-step-one";
import GithubSVG from "@/components/common/svg/github";
import Link from "next/link";

/**
 * Register step one component.
 * Get user email and send verification code
 *
 * @component
 * @returns {JSX.Element} - Rendered register step one
 */

function Register1() {
  // Hooks
  const { mutate } = useStartRegister();
  const t = useTranslations("Auth");

  // Schema
  const StepOneSchema = Yup.object().shape({
    email: Yup.string().required("ایمیل الزامی است"),
  });

  // Registering user logic
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: StepOneSchema,
    onSubmit: async (value) => {
      mutate(value);
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <WelcomeTitle title={t("SignUpTitle")} desc={t("SignUpDesc1")} />
      <div className="flex flex-col flex-wrap gap-[24px]">
        <button className="h-[48px] text-text border border-[#E0E0E0] rounded-2xl flex items-center justify-center gap-2 text-[16px] font-bold cursor-pointer transition-all dark:bg-white">
          <h1>{t("google")}</h1>
          <GithubSVG />
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
        >
          {" "}
          {formik.errors.email && (
            <span className="text-red-500 text-sm text-right">
              {formik.errors.email}
            </span>
          )}
        </InputAuth>
        <Button text={t("SendVerificationCode")} />
      </div>

      <div className="flex justify-center mt-2 gap-[5px]">
        <Link
          href="/auth/login"
          className="text-[14px] font-[500] underline text-[#586CFF] dark:text-[#8b9bff]"
        >
          {t("loginAccount")}
        </Link>
        <span className="text-[14px] font-[500] text-[#222] dark:text-[white]">
          {t("HaveAccount")}
        </span>
      </div>
    </form>
  );
}

export default Register1;

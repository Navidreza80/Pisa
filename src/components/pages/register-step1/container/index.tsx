"use client";
// Next
import Link from "next/link";

// Dependencies
import { useFormik } from "formik";
import { useTranslations } from "next-intl";
import * as Yup from "yup";

// Third party components
import Button from "@/components/common/auth/button";
import InputAuth from "@/components/common/auth/input-auth";
import OrUnderline from "@/components/common/auth/or-underline";
import WelcomeTitle from "@/components/common/auth/welcome-title";

// SVGs
import EmailSVG from "@/components/common/svg/email";

// API
import GithubSVG from "@/components/common/svg/github";
import { useStartRegister } from "@/utils/service/register/post-step-one";

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
    email: Yup.string().required(t("emailRequired")),
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
      {/* Header */}
      <WelcomeTitle title={t("SignUpTitle")} desc={t("SignUpDesc1")} />
      <div className="flex flex-col flex-wrap gap-[24px]">
        <button className="h-[48px] text-text border border-[#E0E0E0] rounded-2xl flex items-center justify-center gap-2 text-[16px] font-bold cursor-pointer transition-all dark:bg-white">
          {/* Github login */}
          <h1>{t("google")}</h1>
          <GithubSVG />
        </button>
        <OrUnderline />
        {/* Register email input */}
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
            <span className="text-red-500 text-sm ">{formik.errors.email}</span>
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

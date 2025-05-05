"use client";

// Next
import { useTranslations } from "next-intl";
import Link from "next/link";

// Dependencies
import { useLoginUser } from "@/utils/service/login/post";
import { useFormik } from "formik";

// SVGs
import EmailSVG from "@/components/common/svg/email";
import Password from "@/components/common/svg/password";

// Third party components
import Button from "../common/button";
import InputAuth from "../common/input-auth";
import OrUnderline from "../common/or-underline";
import WelcomeTitle from "../common/welcome-title";

// SVGs
import GoogleSVG from "@/components/common/svg/google";

// API
import { login } from "@/lib/actions/auth";

/**
 * Login user component
 *
 * @component
 * @returns {JSX.Element} - Rendered Login
 */

function Login() {
  // Hooks
  const { mutate } = useLoginUser();
  const t = useTranslations("Auth");

  // Posting user email and password logic
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    // TODO
    // validationSchema: loginValidations,
    onSubmit: async (value) => {
      mutate(value);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <WelcomeTitle
        created_at={new Date().toISOString()}
        id={Math.random().toString()}
        title={t("loginTitle")}
        desc={t("loginDesc")}
        caption=""
        imageSrc=""
        imageTitle=""
      />
      <div className="flex flex-col flex-wrap gap-[20px]">
        <button
        onClick={() => login()}
          type="button"
          className="h-[48px] text-text border border-[#E0E0E0] rounded-2xl flex items-center justify-center gap-2 text-[16px] font-bold cursor-pointer transition-all dark:bg-white"
        >
          <span>{t("google")}</span>
          <GoogleSVG />{" "}
        </button>
        <OrUnderline />
        <InputAuth
          text={t("email")}
          placeHolder={t("emailDesc")}
          icon={<EmailSVG />}
          id="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          type="email"
        />
        <InputAuth
          text={t("password")}
          placeHolder={t("passwordDesc")}
          icon={<Password />}
          id="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        <Button
          text={t("loginAccount")}
          created_at={new Date().toISOString()}
          id={Math.random().toString()}
          caption=""
          imageSrc=""
          imageTitle=""
        />
      </div>
      <div className="flex justify-center mt-2 gap-[5px]">
        <span className="text-[14px] font-[500] underline text-[#586CFF] dark:text-[#8b9bff]">
          <Link href="/auth/register/step-1">{t("SignUpTitle")}</Link>
        </span>
        <span className="text-[14px] font-[500] text-[#222] dark:text-[white]">
          {t("NoAccount")}
        </span>
      </div>
    </form>
  );
}

export default Login;

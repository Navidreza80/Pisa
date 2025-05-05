"use client";
// Dependencies
import { useFormik } from "formik";
import { useTranslations } from "next-intl";

// SVGs
import MobileSVG from "@/components/common/svg/mobile";
import Password from "@/components/common/svg/password";
import RepeatPassword from "@/components/common/svg/repeat-pass";

// Third party components
import Button from "../common/button";
import InputAuth from "../common/input-auth";
import WelcomeTitle from "../common/welcome-title";

// API and storage
import { useCompleteRegister } from "@/utils/service/register/post-complete-register";
import { getClientCookie } from "@/utils/service/storage/client-cookie";

/**
 * Register step three component.
 * Get user password and phone number and complete the process
 * 
 * @component
 * @returns {JSX.Element} - Rendered register step three
 */

function Register3() {
  // Hooks
  const t = useTranslations("Auth");
  const { mutate } = useCompleteRegister();
  const userId = getClientCookie("userId");

  // Complete user register by posting user info logic
  const formik = useFormik({
    initialValues: {
      phoneNumber: "",
      password: "",
      userId: "",
    },
    onSubmit: async (value) => {
      mutate({
        phoneNumber: value.phoneNumber,
        password: value.password,
        userId: Number(userId),
      });
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <WelcomeTitle title={t("SignUpTitle")} desc={t("SignUpDesc3")} />
      <div className="flex flex-col flex-wrap gap-[24px]">
        <InputAuth
          id="phoneNumber"
          name="phoneNumber"
          value={formik.values.phoneNumber}
          onChange={formik.handleChange}
          placeHolder={t("NumberDesc")}
          icon={<MobileSVG />}
        />
        <InputAuth
          id="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          placeHolder={t("passwordDesc")}
          icon={<Password />}
        />
        <InputAuth
          id="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          placeHolder={t("ConfirmPasswordDesc")}
          icon={<RepeatPassword />}
        />
        <Button text={t("Register")} />
      </div>
    </form>
  );
}

export default Register3;

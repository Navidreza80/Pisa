"use client";
// Dependencies
import { useFormik } from "formik";
import { useTranslations } from "next-intl";
import * as Yup from "yup";

// SVGs
import MobileSVG from "@/components/common/svg/mobile";
import Password from "@/components/common/svg/password";
import RepeatPassword from "@/components/common/svg/repeat-pass";

// Third party components
import Button from "@/components/common/auth/button";
import InputAuth from "@/components/common/auth/input-auth";
import WelcomeTitle from "@/components/common/auth/welcome-title";

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

  // Schema
  const RegisterStepThree = Yup.object().shape({
    repeatedPassword: Yup.string()
      .required(t("repeatPassVal"))
      .oneOf([Yup.ref("password"), null], t("wrongRepeat")),
    password: Yup.string().required(t("passVal")),
    phoneNumber: Yup.string().required(t("phoneNumberVal")),
  });

  // Complete user register by posting user info logic
  const formik = useFormik({
    initialValues: {
      phoneNumber: "",
      password: "",
      repeatedPassword: "",
      userId: "",
    },
    validationSchema: RegisterStepThree,
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
      {/* Page header */}
      <WelcomeTitle title={t("SignUpTitle")} desc={t("SignUpDesc3")} />
      <div className="flex flex-col flex-wrap gap-[24px]">
        {/* Register info */}
        <InputAuth
          id="phoneNumber"
          name="phoneNumber"
          value={formik.values.phoneNumber}
          onChange={formik.handleChange}
          placeHolder={t("NumberDesc")}
          icon={<MobileSVG />}
        >
          {formik.errors.phoneNumber && (
            <span className="text-red-500 text-sm ">
              {formik.errors.phoneNumber}
            </span>
          )}
        </InputAuth>
        <InputAuth
          id="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          placeHolder={t("passwordDesc")}
          icon={<Password />}
        >
          {formik.errors.password && (
            <span className="text-red-500 text-sm ">
              {formik.errors.password}
            </span>
          )}
        </InputAuth>
        <InputAuth
          id="repeatedPassword"
          name="repeatedPassword"
          value={formik.values.repeatedPassword}
          onChange={formik.handleChange}
          placeHolder={t("ConfirmPasswordDesc")}
          icon={<RepeatPassword />}
        >
          {formik.errors.repeatedPassword && (
            <span className="text-red-500 text-sm ">
              {formik.errors.repeatedPassword}
            </span>
          )}
        </InputAuth>
        <Button text={t("Register")} />
      </div>
    </form>
  );
}

export default Register3;

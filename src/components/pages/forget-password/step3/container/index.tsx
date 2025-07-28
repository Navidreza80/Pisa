"use client";

// Dependencies
import { useFormik } from "formik";
import { useTranslations } from "next-intl";
import * as Yup from "yup";

// SVGs
import Password from "@/components/common/svg/password";
import RepeatPassword from "@/components/common/svg/repeat-pass";

// Third party components
import Button from "@/components/common/auth/button";
import InputAuth from "@/components/common/auth/input-auth";
import WelcomeTitle from "@/components/common/auth/welcome-title";
import { useResetPassword } from "@/utils/service/forgetPassword/post-complete-forgetPass";
/**
 * Forget password reset form
 *
 * @component
 * @returns {JSX.Element}
 */
function ForgetPasswordStep3() {
  const t = useTranslations("Auth");
  const resetPasswordMutation = useResetPassword();

  const ForgetPasswordSchema = Yup.object().shape({
    repeatedPassword: Yup.string()
      .required(t("repeatPassVal"))
      .oneOf([Yup.ref("password"), null], t("wrongRepeat")),
    password: Yup.string().required(t("passVal")),
  });

  const formik = useFormik({
    initialValues: {
      password: "",
      repeatedPassword: "",
    },
    validationSchema: ForgetPasswordSchema,
    onSubmit: async (values) => {
      const email = localStorage.getItem("resetEmail");
      const resetCode = localStorage.getItem("resetCode");

      if (!email || !resetCode) {
        console.error("Missing email or reset code in localStorage.");
        return;
      }

      console.log("[ForgetPasswordStep3] submitting reset with:", {
        email,
        resetCode,
        newPassword: values.password,
      });

      resetPasswordMutation.mutate({
        email,
        resetCode,
        newPassword: values.password,
      });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <WelcomeTitle title={t("ForgetPasswordTitle")} desc={t("ForgetPasswordDesc")} />

      <div className="flex flex-col gap-6">
        <InputAuth
          id="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          placeHolder={t("passwordDesc")}
          icon={<Password />}
        >
          {formik.errors.password && (
            <span className="text-red-500 text-sm">{formik.errors.password}</span>
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
            <span className="text-red-500 text-sm">{formik.errors.repeatedPassword}</span>
          )}
        </InputAuth>

        <Button
          type="submit"
          text={resetPasswordMutation.isLoading ? t("Sending") : t("ConfirmNewPassword")}
          disabled={resetPasswordMutation.isLoading}
        />

        {resetPasswordMutation.isError && (
          <p className="text-red-500 text-center mt-2">
            {t("genericError")}
          </p>
        )}
      </div>
    </form>
  );
}

export default ForgetPasswordStep3;

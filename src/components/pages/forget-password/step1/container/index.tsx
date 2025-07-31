"use client";

// Next
import Link from "next/link";

// Dependencies
import { useFormik } from "formik";
import * as Yup from "yup";

// Components
import Button from "@/components/common/auth/button";
import InputAuth from "@/components/common/auth/input-auth";
import WelcomeTitle from "@/components/common/auth/welcome-title";

// SVGs
import EmailSVG from "@/components/common/svg/email";

// API
import { useForgotPasswordRequest } from "@/utils/service/forgetPassword/post-step-one";

function ForgotPasswordStep1() {
  const forgotPasswordMutation = useForgotPasswordRequest();

  // Validation Schema
  const Schema = Yup.object().shape({
    email: Yup.string()
      .email("ایمیل معتبر نیست")
      .required("وارد کردن ایمیل الزامی است"),
  });

  // Formik
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Schema,
    onSubmit: (values) => {
      forgotPasswordMutation.mutate({ email: values.email });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <WelcomeTitle
        title="بازیابی رمز عبور"
        desc="برای بازیابی رمز عبور، ایمیل خود را وارد کنید"
      />

      <div className="flex flex-col gap-6">
        {/* Input */}
        <InputAuth
          text="ایمیل"
          id="email"
          name="email"
          type="email"
          placeHolder="ایمیل خود را وارد کنید"
          value={formik.values.email}
          onChange={formik.handleChange}
          icon={<EmailSVG />}
        >
          {formik.errors.email && formik.touched.email && (
            <span className="text-red-500 text-sm">{formik.errors.email}</span>
          )}
        </InputAuth>

        {/* Button */}
        <Button
          text={
            forgotPasswordMutation.isPending
              ? "در حال ارسال..."
              : "ارسال کد تایید"
          }
          type="submit"
          disabled={forgotPasswordMutation.isPending}
        />
      </div>

      <div className="flex justify-center mt-4 gap-[5px]">
        <Link
          href="/auth/login"
          className="text-sm font-medium underline text-[#586CFF] dark:text-[#8b9bff]"
        >
          بازگشت به ورود
        </Link>
      </div>
    </form>
  );
}

export default ForgotPasswordStep1;

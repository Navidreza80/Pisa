"use client";

// SVG
import EmailSVG from "@/components/common/svg/email";
import Password from "@/components/common/svg/password";
// Third party components
import { login } from "@/utils/service/login/login";
import { setClientCookie } from "@/utils/service/storage/client-cookie";
import { useFormik } from "formik";
import { useTranslations } from "next-intl";
import Button from "../common/button";
import InputAuth from "../common/input-auth";
import OrUnderline from "../common/or-underline";
import WelcomeTitle from "../common/welcome-title";
import { setServerCookie } from "@/utils/service/storage/server-cookie";

function Login() {
  const t = useTranslations("Auth");
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    // validationSchema: loginValidations,
    onSubmit: async (value) => {
      const user = await login(value);
      if (user.message) {
        console.log("Email or password wrong");
        return false;
      }
      await setServerCookie("serverAccessToken", user.accessToken);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <WelcomeTitle title={t("loginTitle")} desc={t("loginDesc")} />
      <div className="flex flex-col flex-wrap gap-[20px]">
        <button className="h-[48px] bg-black border border-[#E0E0E0] rounded-[24px] flex items-center justify-center gap-2 text-[16px] font-bold text-black hover:bg-[#f5f5f5] transition-all"></button>
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
        <Button text={t("loginAccount")} />
      </div>
      <div className="flex justify-center mt-2 gap-[5px]">
        <span className="text-[14px] font-[500] underline text-[#586CFF] dark:text-[#8b9bff]">
          {t("SignUpTitle")}
        </span>
        <span className="text-[14px] font-[500] text-[#222] dark:text-[white]">
          {t("NoAccount")}
        </span>
      </div>
    </form>
  );
}

export default Login;

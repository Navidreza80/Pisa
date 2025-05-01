"use client";
// SVG
import EmailSVG from "@/components/common/svg/email";
import Password from "@/components/common/svg/password";
// Next hooks 
import { useRouter } from "next/navigation";
// API
import { login } from "@/utils/service/login/login";
// Cookies
import { setClientCookie } from "@/utils/service/storage/client-cookie";
import { setServerCookie } from "@/utils/service/storage/server-cookie";
// Formik hooks
import { useFormik } from "formik";
// Change lang
import { useTranslations } from "next-intl";
// Third party components
import Button from "../common/button";
import InputAuth from "../common/input-auth";
import OrUnderline from "../common/or-underline";
import WelcomeTitle from "../common/welcome-title";
// Toast
import { toast } from "react-toastify";
import { LoginUser } from "@/types/user";


function Login() {
  // hooks
  const router = useRouter();
  const t = useTranslations("Auth");
  // formik hook handler
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    // validationSchema: loginValidations,
    onSubmit: async (value) => {
      toast.promise(
        async () => {
          const user: LoginUser = await login(value);
          if (typeof user.accessToken == "string") {
            await setServerCookie("serverAccessToken", user.accessToken);
            await setServerCookie("serverRefreshToken", user.refreshToken);
            setClientCookie("clientAccessToken", user.accessToken,15)
            router.push("/");
          }
        },
        {
          pending: "در حال پردازش",
          success: "خوش آمدید!",
          error: "ایمیل یا پسوورد اشتباه می باشد!",
        }
      );
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

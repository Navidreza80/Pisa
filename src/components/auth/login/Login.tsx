// SVG
import EmailSVG from "@/components/common/svg/email";
import Password from "@/components/common/svg/password";
// Third party components
import Button from "../common/button";
import InputAuth from "../common/input-auth";
import OrUnderline from "../common/or-underline";
import WelcomeTitle from "../common/welcome-title";
import { getTranslations } from "next-intl/server";

async function Login() {
  const t = await getTranslations("Auth");

  return (
    <>
      <WelcomeTitle
        title={t("loginTitle")}
        desc={t("loginDesc")}
      />
      <div className="flex flex-col flex-wrap gap-[20px]">
        <button className="h-[48px] bg-black border border-[#E0E0E0] rounded-[24px] flex items-center justify-center gap-2 text-[16px] font-bold text-black hover:bg-[#f5f5f5] transition-all"></button>
        <OrUnderline />
        <InputAuth
          name={t("email")}
          placeHolder={t("emailDesc")}
          icon={<EmailSVG />}
        />
        <InputAuth
          name={t("password")}
          placeHolder={t("passwordDesc")}
          icon={<Password />}
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
    </>
  );
}

export default Login;
// SVGs
import MobileSVG from "@/components/common/svg/mobile";
import Password from "@/components/common/svg/password";
import RepeatPassword from "@/components/common/svg/repeat-pass";
// Third party components
import Button from "../common/button";
import InputAuth from "../common/input-auth";
import WelcomeTitle from "../common/welcome-title";
import { getTranslations } from "next-intl/server";

async function Register3() {
  const t = await getTranslations("Auth");
  return (
    <>
      <WelcomeTitle
        title={t("SignUpTitle")}
        desc={t("SignUpDesc3")}
      />
      <div className="flex flex-col flex-wrap gap-[24px]">
        <InputAuth
          name={t("Number")}
          placeHolder={t("NumberDesc")}
          icon={<MobileSVG />}
        />
        <InputAuth
          name={t("password")}
          placeHolder={t("passwordDesc")}
          icon={<Password />}
        />
        <InputAuth
          name={t("ConfirmPassword")}
          placeHolder={t("ConfirmPasswordDesc")}
          icon={<RepeatPassword />}
        />
        <Button text={t("Register")} />
      </div>
    </>
  );
}

export default Register3;

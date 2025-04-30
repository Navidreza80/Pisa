// Next built in components
import Link from "next/link";
// Third party components
import Button from "../common/button";
import InputAuth from "../common/input-auth";
import OrUnderline from "../common/or-underline";
import WelcomeTitle from "../common/welcome-title";
// SVGs
import EmailSVG from "@/components/common/svg/email";
import { getTranslations } from "next-intl/server";

async function Register1() {
    const t = await getTranslations("Auth");
    return (
        <>
            <WelcomeTitle
                title={t("SignUpTitle")}
                desc={t("SignUpDesc1")}
            />
            <div className="flex flex-col flex-wrap gap-[24px]">
                <button className="h-[48px] bg-black text-white border border-[#E0E0E0] rounded-[24px] flex items-center justify-center gap-2 text-[16px] font-bold hover:bg-[#333] transition-all dark:bg-white dark:text-black dark:hover:bg-[#f5f5f5]"></button>
                <OrUnderline />
                <InputAuth
                    name={t("email")}
                    placeHolder={t("emailDesc")}
                    icon={<EmailSVG />}
                />
            </div>

            <Link
                href="/auth/login"
                className="text-[#586CFF] text-[14px] font-[600] mx-1 underline dark:text-[#8b9bff]"
            >
                <Button text={t("loginAccount")} />
            </Link>

            <div className="flex justify-center mt-2 gap-[5px]">
                <span className="text-[14px] font-[500] underline text-[#586CFF] dark:text-[#8b9bff]">
                    {t("loginAccount")}
                </span>
                <span className="text-[14px] font-[500] text-[#222] dark:text-[white]">
                    {t("HaveAccount")}
                </span>
            </div>
        </>
    );
}

export default Register1;


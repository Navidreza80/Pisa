// Next built in components
import Link from "next/link";
// Third party components
import Button from "../common/button";
import InputAuth from "../common/input-auth";
import OrUnderline from "../common/or-underline";
import WelcomeTitle from "../common/welcome-title";
// SVGs
import EmailSVG from "@/components/common/svg/email";

function Register1() {
  return (
    <>
      <WelcomeTitle
        title="ثبت نام در پیزا"
        desc="برای ثبت نام در آلفا میتوانید با اکانت گوگل خود و یا با ارسال کد تایید به ایمیل خود اقدام کنید"
      />
      <div className="flex flex-col flex-wrap gap-[24px]">
        <button className="h-[48px] bg-black border border-[#E0E0E0] rounded-[24px] flex items-center justify-center gap-2 text-[16px] font-bold text-black hover:bg-[#f5f5f5] transition-all"></button>
        <OrUnderline />
        <InputAuth
          name="ایمیل"
          placeHolder="ایمیل خود را وارد کنید"
          icon={<EmailSVG />}
        />
        <Button text="ارسال کد تایید" />
      </div>
      <div className="flex justify-center mt-2 gap-[5px]">
        <Link
          href="/auth/login"
          className="text-[#586CFF] text-[14px] font-[600]  mx-1 underline"
        >
          ورود به حساب
        </Link>
        <span className="text-[14px] font-[500] text-[#222]">
          حساب کاربری دارید؟{" "}
        </span>
      </div>
    </>
  );
}

export default Register1;

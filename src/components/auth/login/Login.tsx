// SVG
import EmailSVG from "@/components/common/svg/email";
import Password from "@/components/common/svg/password";
// Third party components
import Button from "../common/button";
import InputAuth from "../common/input-auth";
import OrUnderline from "../common/or-underline";
import WelcomeTitle from "../common/welcome-title";

function Login() {
  return (
    <>
      <WelcomeTitle
        title="ورود به پیزا"
        desc="برای ورود به حساب کاربری آلفا میتوانید با اکانت گوگل خود و یا با ایمیل و رمزعبور خود اقدام کنید"
      />
      <div className="flex flex-col flex-wrap gap-[20px]">
        <button className="h-[48px] bg-black border border-[#E0E0E0] rounded-[24px] flex items-center justify-center gap-2 text-[16px] font-bold text-black hover:bg-[#f5f5f5] transition-all"></button>
        <OrUnderline />
        <InputAuth
          name="ایمیل"
          placeHolder="ایمیل خود را وارد کنید"
          icon={<EmailSVG />}
        />
        <InputAuth
          name="رمزعبور"
          placeHolder="رمزعبور خود را وارد کنید"
          icon={<Password />}
        />
        <Button text="ورود به حساب" />
      </div>
    </>
  );
}

export default Login;

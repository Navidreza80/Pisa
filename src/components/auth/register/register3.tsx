// SVGs
import MobileSVG from "@/components/common/svg/mobile";
import Password from "@/components/common/svg/password";
import RepeatPassword from "@/components/common/svg/repeat-pass";
// Third party components
import Button from "../common/button";
import InputAuth from "../common/input-auth";
import WelcomeTitle from "../common/welcome-title";

function Register3() {
  return (
    <>
      <WelcomeTitle
        title="ثبت نام در پیزا"
        desc="مشخصات خواسته شده را پر کنید"
      />
      <div className="flex flex-col flex-wrap gap-[24px]">
        <InputAuth
          name="شماره تماس"
          placeHolder="شماره تماس خود را وارد کنید"
          icon={<MobileSVG />}
        />
        <InputAuth
          name="رمزعبور"
          placeHolder="رمزعبور خود را وارد کنید"
          icon={<Password />}
        />
        <InputAuth
          name="تکرار رمزعبور"
          placeHolder="تکرار رمزعبور خود را وارد کنید"
          icon={<RepeatPassword />}
        />
        <Button text="ثبت نام" />
      </div>
    </>
  );
}

export default Register3;

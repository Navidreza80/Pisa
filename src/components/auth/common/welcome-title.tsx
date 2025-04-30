// Types
import WelcomeTitleProps from "@/types/auth";
// SVGs
import LogoSVG from "@/components/common/svg/logo";

export default function WelcomeTitle({ title, desc }: WelcomeTitleProps) {
  return (
    <>
      <div dir="rtl" className="max-[600px]:w-[100%]">
        <LogoSVG size="w-[106px] h-[36px]" />
      </div>
      <div className="max-[600px]:w-[100%]">
        <h1 className="text-[36px] text-right font-[700] text-[#000000] dark:text-white mb-[24px]">
          {title}
        </h1>
        {desc && (
          <p className="text-[14px] text-right font-[600] text-[#767676] dark:text-[#aaa]">
            {desc}
          </p>
        )}
      </div>
    </>
  );
}


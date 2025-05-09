// Types
import type WelcomeTitleProps from "@/types/auth";

// SVGs
import LogoSVG from "@/components/common/svg/logo";

/**
 * Reusable welcome title to show title and description of the auth pages
 *
 * @component
 * @param {WelcomeTitleProps} props - Component props
 * @returns {JSX.Element} - Rendered welcome title
 */

export default function WelcomeTitle({ title, desc }: WelcomeTitleProps) {
  return (
    <>
      <div dir="rtl" className="max-[600px]:w-[100%] mb-6">
        <LogoSVG size="w-[106px] h-[36px]" />
      </div>
      <div className="max-[600px]:w-[100%]">
        <h1 className="text-[36px] text-right font-[700] text-text mb-[24px]">
          {title}
        </h1>
        {desc && (
          <p className="text-[14px] text-right mb-6 font-[600] text-text-secondary">
            {desc}
          </p>
        )}
      </div>
    </>
  );
}

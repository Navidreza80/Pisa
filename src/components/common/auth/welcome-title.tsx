// Types
import type WelcomeTitleProps from "@/types/auth";

// SVGs
import LogoSVG from "@/components/common/svg/logo";
import { HomeIcon } from "lucide-react";

// Next
import Link from "next/link";

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
      <div
        
        className="max-[600px]:w-[100%] mb-6 flex justify-between items-center"
      >
        <LogoSVG size="w-[106px] h-[36px]" />
        <Link href="/" className="bg-primary p-2 cursor-pointer rounded-full">
          <HomeIcon className="text-white " />
        </Link>
      </div>
      <div className="max-[600px]:w-[100%]">
        <h1 className="text-[36px]  font-[700] text-text mb-[24px]">
          {title}
        </h1>
        {desc && (
          <p className="text-[14px]  mb-6 font-[600] text-text-secondary">
            {desc}
          </p>
        )}
      </div>
    </>
  );
}

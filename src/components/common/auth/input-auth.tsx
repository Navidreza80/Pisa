// ShadCn components
import { Input } from "@/components/ui/input";

// Types
import type InputAuthProps from "@/types/auth";

/**
 * Reusable auth input for getting user info
 *
 * @component
 * @param {InputAuthProps} props - Component props
 * @returns {JSX.Element} - Rendered auth input
 */

export default function InputAuth({
  text,
  placeHolder,
  icon,
  children,
  ...props
}: InputAuthProps) {
  return (
    <div className="max-[600px]:w-[100%]">
      <p className="text-[14px] font-[500]  mb-[15px] text-black dark:text-white">
        {text}
      </p>
      <div className="relative h-[48px]">
        <Input
          {...props}
          
          className="h-full max-[600px]:h-[56px] max-[600px]:w-[100%] placeholder:!text-fade
                     !text-text
                     py-[12px] !rounded-[16px] !pr-[40px] 
                     border border-border"
          placeholder={placeHolder}
        />
        <span className="absolute right-[10px] top-1/2 -translate-y-1/2 text-xl text-[#767676] dark:text-[#A0A0A0]">
          {icon}
        </span>
        <div className="text-center mb-2"> {children}</div>
      </div>
    </div>
  );
}

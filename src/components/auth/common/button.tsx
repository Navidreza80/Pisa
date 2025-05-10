// Types for type safety
import type ButtonProps from "@/types/auth";

/**
 * Reusable button component for auth pages
 *
 * @component
 * @param {ButtonProps} props - Component props
 * @returns {JSX.Element} - Rendered auth button
 */

export default function Button({ text, disabled }: ButtonProps) {
  return (
    <button
      disabled={disabled}
      type="submit"
      className="w-[100%] mt-2 max-[600px]:h-[56px] h-[48px] cursor-pointer bg-primary rounded-[16px] text-white font-bold text-[18px] hover:bg-[#3b5fc9] transition-all"
    >
      {text}
    </button>
  );
}

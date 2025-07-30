"use client";
// React
import { ReactNode } from "react";
// button sizes
const SIZES = {
  md: "w-[133px] h-12 px-4 py-[9px]",
  lg: "py-3.5 px-4 min-w-[129px] max-[600px]:py-4 max-[600px]:px-5",
};
// button colors
const COLORS = {
  primary: "bg-primary text-white",
};

// types
type ButtonProps = {
  color?: keyof typeof COLORS;
  size?: keyof typeof SIZES;
  width?: string;
  height?: string;
  startContent?: ReactNode;
  endContent?: ReactNode;
  isMagnetic?: boolean;
  children: ReactNode;
  className?: string;
  variant?: "bordered" | "solid";
  handleClick?: () => void;
  type?: "submit" | "reset" | "button" | undefined;
  disabled?: boolean;
};

/**
 * Reusable button component.
 *
 * @component
 * @param {ButtonProps} props - Component props
 * @returns {JSX.Element} - Rendered button
 */

export default function Button({
  type = "submit",
  color = "primary",
  size = "md",
  startContent,
  endContent,
  variant = "solid",
  children,
  className,
  handleClick,
  disabled,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={disabled ? () => "" : handleClick}
      className={`flex items-center cursor-pointer hover:bg-[#4A5FE3] font-semibold !rounded-2xl focus:scale-95 focus:shadow-lg whitespace-nowrap justify-center overflow-hidden transition-all ${className} 
            ${variant === "solid" ? COLORS[color] : `bg-transparent border-border border`} ${
              SIZES[size]
            }`}
    >
      {/* Start Content (Icon/Text) */}
      {startContent && <span className="mr-2">{startContent}</span>}

      {children}

      {/* End Content (Icon/Text) */}
      {endContent && <span className="ml-2">{endContent}</span>}
    </button>
  );
}

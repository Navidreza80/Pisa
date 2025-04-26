"use client";
// React built in
import { ReactNode, useRef } from "react";
// button sizes
const SIZES = {
  md: "w-[133px] h-12 px-4 py-[9px]",
  lg: "py-3.5 px-4 min-w-[129px] max-[600px]:py-4 max-[600px]:px-5",
};
// button colors
const COLORS = {
  primary: "bg-[#586CFF] text-white",
};
// button border radius
const Radiuses = {
  sm: "rounded-xl",
  md: "rounded-2xl",
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
  radius?: keyof typeof Radiuses;
  handleClick?: () => void;
};

export default function Button({
  color = "primary",
  size = "md",
  startContent,
  endContent,
  variant = "solid",
  children,
  className,
  handleClick,
  radius = "md",
}: ButtonProps) {
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  return (
    <button
      type="submit"
      ref={buttonRef}
      onClick={handleClick}
      className={`flex items-center hover:bg-[#4A5FE3] justify-center overflow-hidden transition-all ${className} 
            ${variant === "solid" ? COLORS[color] : `bg-transparent`} ${
        SIZES[size]
      } ${Radiuses[radius]}`}
    >
      {/* Start Content (Icon/Text) */}
      {startContent && <span className="mr-2">{startContent}</span>}

      {children}

      {/* End Content (Icon/Text) */}
      {endContent && <span className="ml-2">{endContent}</span>}
    </button>
  );
}

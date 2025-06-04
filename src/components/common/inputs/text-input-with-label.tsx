"use client";

/**
 * Reusable text-input component.
 *
 * @component
 * @returns {JSX.Element} - Rendered text-input
 */

export default function InputText({
  value,
  onChange,
  label,
  placeHolder,
  height,
  color,
  className,
  ...props
}: {
  color?: string;
  value?: string;
  placeHolder?: string | null;
  label?: string;
  onChange?: () => void;
  className?: string;
  height?: string;
}) {
  return (
    <div dir="rtl" className={`relative ${className}`}>
      <div className={`text-fade font-medium text-[13px] absolute top-[-10] ${color ? color : 'bg-background'} right-2 px-2`}>
        {label}
      </div>
      <input
        {...props}
        onChange={onChange}
        value={value}
        className={`w-full border ${color ? color : 'bg-background'} border-border placeholder:text-text text-text ${height ? height : "h-[48px]"} px-[11px] rounded-2xl focus:outline-0 outline-0`}
        placeholder={placeHolder ? placeHolder : ""}
      ></input>
    </div>
  );
}

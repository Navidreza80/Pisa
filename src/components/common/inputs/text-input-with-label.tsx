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
  className,
  ...props
}: {
  value?: string;
  placeHolder?: string | null;
  label?: string;
  onChange?: () => void;
  className?: string;
  height?: string;
}) {
  return (
    <div dir="rtl" className={`relative ${className}`}>
      <div className="text-fade font-medium text-[13px] absolute top-[-10] bg-background right-2 px-2">
        {label}
      </div>
      <input
        {...props}
        onChange={onChange}
        value={value}
        className={`w-full border bg-background border-border placeholder:text-text text-text ${height ? height : "h-[48px]"} px-[11px] rounded-2xl`}
        placeholder={placeHolder ? placeHolder : ""}
      ></input>
    </div>
  );
}

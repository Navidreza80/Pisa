"use client";
// Dependencies
import { useTranslations } from "next-intl";

/**
 * Reusable text-input component.
 *
 * @component
 * @returns {JSX.Element} - Rendered text-input
 */

export default function InputText({
  value,
  onChange,
  name,
  width,
  className,
  ...props
}: {
  value?: string | number;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  width?: string;
  className?: string;
}) {
  const t = useTranslations("Input");
  return (
    <input
      name={name}
      {...props}
      onChange={onChange}
      value={value}
      dir="rtl"
      className={`${className} border bg-background border-border  text-text ${
        width ? width : "w-[155px]"
      } h-[48px] px-[11px] rounded-2xl`}
      placeholder={t("enter")}
    ></input>
  );
}

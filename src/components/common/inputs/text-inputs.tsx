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
  width,
  className,
  ...props
}: {
  value?: string;
  onChange?: () => void;
  width?: string;
  className?: string;
}) {
  const t = useTranslations("Input");
  return (
    <input
      {...props}
      onChange={onChange}
      value={value}
      className={`${className} border bg-background border-border  text-text ${
        width ? width : "w-[155px]"
      } h-[48px] px-[11px] rounded-2xl`}
      placeholder={t("enter")}
    ></input>
  );
}

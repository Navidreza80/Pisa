"use client";
import { useTranslations } from "next-intl";

export default function InputText({
  placeHolder,
  value,
  onChange,
  width,
  ...props
}: {
  placeHolder: string;
  value: string;
  onChange: () => void;
  width: string;
}) {
  const t = useTranslations("Input");
  return (
    <input
      {...props}
      onChange={onChange}
      value={value}
      className={`border bg-background border-border  text-text ${
        width ? width : "w-[155px]"
      } h-[48px] px-[11px] rounded-2xl`}
      placeholder={t("enter")}
    ></input>
  );
}

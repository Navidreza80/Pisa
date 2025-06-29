// Shadcn components
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
// Change lang
import { useTranslations } from "next-intl";

/**
 * Reusable select-option input component.
 *
 * @component
 * @returns {JSX.Element} - Rendered select-input
 */

export default function InputSelect({
  width,
  items,
  label,
  color,
  name,
  className,
  withLabel,
  onChange,
  value,
}: {
  className?: string;
  name?: string;
  items?: any;
  onChange?: (selectedValue: number | string) => void;
  label?: string;
  value?: number | string;
  withLabel?: boolean;
  width?: number;
  color?: string;
}) {
  // Hooks
  const t = useTranslations("HomePage");

  // HandleChange
  const handleChange = (selectedValue: string) => {
    const found = items.find(
      (item) => String(item.value ?? item.id ?? item.text) === selectedValue
    );
    if (onChange) {
      onChange(found?.value ?? selectedValue);
    }
  };

  return (
    <Select name={name} value={String(value)} onValueChange={handleChange}>
      <SelectTrigger
        dir="rtl"
        className={`${className} cursor-pointer outline-0 focus:outline-0  ${color ? color : ""} !h-[48px] z-[1000] text-fade relative rounded-2xl shadow-none !font-medium border-border ${
          width ? `w-[${width}px]` : "w-[162px]"
        }`}
        style={{ width: width ? width : 162 }}
      >
        {withLabel && (
          <div
            className={`text-fade font-medium text-[13px] outline-0 focus:outline-0  absolute top-[-10] ${color ? color : "bg-background"} right-2 px-2`}
          >
            {label}
          </div>
        )}
        <SelectValue
          className="z-[100] relative !font-medium outline-0 focus:outline-0 "
          placeholder={t("choose")}
        />
      </SelectTrigger>
      <SelectContent
        dir="rtl"
        className="!p-0 !border-none rounded-[16px] bg-surface z-[100] font-medium relative "
      >
        {items?.map((item, index) => (
          <SelectItem
            key={index}
            value={String(item.value ?? item.id ?? item.text)}
            className=" z-[100] relative font-medium text-text"
          >
            {item.area_name || item.text || item.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

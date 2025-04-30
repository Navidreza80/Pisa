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

export default function InputSelect({
  width,
  items,
  onChange,
  value,
}: {
  items: { text: string; area_name: string; value: number; id: number }[];
  onChange: (selectedValue: number | string) => void;
  value: number | string;
  width?: number;
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
    <Select value={String(value)} onValueChange={handleChange}>
      <SelectTrigger
        dir="rtl"
        className={`font-yekan !h-[48px] rounded-[16px] border-[#EAEAEA] ${
          width ? `w-[${width}px]` : "w-[162px]"
        }`}
        style={{ width: width ? width : 162 }}
      >
        <SelectValue placeholder={t("choose")} />
      </SelectTrigger>
      <SelectContent className="rounded-[16px] font-yekan">
        {items?.map((item, index) => (
          <SelectItem
            key={index}
            value={String(item.value ?? item.id ?? item.text)}
            className="font-yekan"
          >
            {item.area_name || item.text}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function InputSelect({
  width,
  items,
  onChange,
  value,
  label,
  className,
}: {
  items: { text?: string; area_name?: string; value?: number; id?: number }[];
  onChange?: (selectedValue: number | string) => void;
  value: number | string;
  width?: number;
  label?: string;
  className?: string;
}) {
  const handleChange = (selectedValue: string) => {
    const found = items.find(
      (item) => String(item.value ?? item.id ?? item.text) === selectedValue
    );
    if (onChange) {
      onChange(found?.value ?? found?.id ?? found?.text ?? selectedValue);
    }
  };

  return (
    <Select value={String(value)} onValueChange={handleChange}>
      <SelectTrigger
        dir="rtl"
        className={`${className} !h-[48px] z-[10000000000] text-text-secondary relative rounded-2xl shadow-none !font-medium border-border ${
          width ? `w-[${width}px]` : "w-[162px]"
        }`}
        style={{ width: width ? width : 162 }}
      >
        <SelectValue
          className="z-[10000000000] relative !font-medium"
          placeholder="انتخاب"
        />
        <div className="text-fade font-medium text-[13px] absolute top-[-10] bg-background right-2 px-2">
          {label}
        </div>
      </SelectTrigger>
      <SelectContent className="rounded-[16px] bg-background z-[10000000000] font-medium relative ">
        {items?.map((item) => (
          <SelectItem
            key={item.id}
            value={String(item.value ?? item.id ?? item.text)}
            className=" z-[10000000000] relative font-medium"
          >
            {item.area_name || item.text}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default InputSelect;

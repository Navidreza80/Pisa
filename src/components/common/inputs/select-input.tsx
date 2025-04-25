import { Select } from "antd";
import { useTranslations } from "next-intl";

export default function InputSelect({ items, onChange, value }) {
  const t = useTranslations("HomePage");
  
  const handleChange = (selectedValue) => {
    if (onChange) {
      onChange(selectedValue);
    }
  };
  
  return (
    <Select
      options={items.map(item => ({
        value: item.value || item.id || item.text,
        label: <span className="font-yekan">{item.area_name || item.text}</span>
      }))}
      placeholder={t("choose")}
      onChange={handleChange}
      value={value}
      suffixIcon={
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 7.50004C15 7.50004 11.3176 12.5 10 12.5C8.68233 12.5 5 7.5 5 7.5"
            stroke="black"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      }
      style={{
        height: 48,
        width: 162,
        borderColor: "#EAEAEA",
      }}
      dropdownStyle={{
        borderRadius: 16,
      }}
      className="!h-[48px] !w-[162px] [&_.ant-select-selector]:!h-[48px] [&_.ant-select-selector]:!rounded-[16px]"
    />
  );
}
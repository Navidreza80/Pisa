// antd components
import { Input } from "antd";
// Types
import InputAuthProps from "@/types/auth";

export default async function InputAuth({
  name,
  placeHolder,
  icon,
}: InputAuthProps) {
  return (
    <div className="max-[600px]:w-[100%]">
      <p className="text-[14px] font-[500] text-right mb-[15px]">{name}</p>
      <div className="relative h-[48px]">
        <Input
          dir="rtl"
          size="large"
          className="h-full max-[600px]:h-[56px] max-[600px]:w-[100%] placeholder-black py-[12px] !rounded-[16px] !pr-[40px]"
          placeholder={placeHolder}
        />
        <span className="absolute right-[10px] top-1/2 -translate-y-1/2 text-xl text-[#767676]">
          {icon}
        </span>
      </div>
    </div>
  );
}

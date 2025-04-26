import { Input } from "antd";
import InputAuthProps from "@/types/auth";

export default async function InputAuth({
  name,
  placeHolder,
  icon,
}: InputAuthProps) {
  return (
    <div className="max-[600px]:w-[100%]">
      <p className="text-[14px] font-[500] text-right mb-[15px] text-black dark:text-white">
        {name}
      </p>
      <div className="relative h-[48px]">
        <Input
          dir="rtl"
          size="large"
          className="h-full max-[600px]:h-[56px] max-[600px]:w-[100%] 
                     placeholder:text-gray-500 dark:placeholder:!text-[#a7a7a7] 
                     !bg-white dark:!bg-[#2b2b2b] 
                     !text-black dark:!text-white 
                     py-[12px] !rounded-[16px] !pr-[40px] 
                     border border-[#E0E0E0] dark:!border-[#393939]"
          placeholder={placeHolder}
        />
        <span className="absolute right-[10px] top-1/2 -translate-y-1/2 text-xl text-[#767676] dark:text-[#A0A0A0]">
          {icon}
        </span>
      </div>
    </div>
  );
}


import { getTranslations } from "next-intl/server";
import SectionName from "./section-name";

export default async function RentForm() {
  const t = await getTranslations("SingleHouse");
  return (
    <div className="mt-1.5 flex flex-col gap-6">
      {/* Section name */}
      <SectionName sectionName={t("rentPrice")} />
      {/* Top section */}
      <div className="w-full flex gap-[17px]">
        <div className="w-[calc(50%-8.5px)] border rounded-[20px] py-3 px-4 border-border h-[93px] text-primary text-[20px] flex flex-col gap-y-3 ">
          {/* Title */}
          {t("mortgageFrom")}
          {/* Value */}
          <div className="flex w-full flex-row gap-[5px] justify-end">
            {/* Currency */}
            <p className="text-[12px] font-[700] my-auto text-text-secondary ">
              تومان
            </p>
            {/* Price */}
            <h1 className="text-[20px] font-[700] !text-text my-auto ">
              1200000
            </h1>
          </div>
        </div>
        <div className="w-[calc(50%-8.5px)] border rounded-[20px] py-3 px-4 border-border h-[93px] text-primary text-[20px] flex flex-col gap-y-3 ">
          {/* Title */}
          {t("rentFrom")}
          {/* Value */}
          <div className="flex w-full flex-row gap-[5px] justify-end">
            {/* Currency */}
            <p className="text-[12px] font-[700] my-auto text-text-secondary ">
              تومان
            </p>
            {/* Price */}
            <h1 className="text-[20px] font-[700] !text-text my-auto ">
              1200000
            </h1>
          </div>
        </div>
      </div>
      {/* Bottom section */}
      <div className="w-full lg:flex-nowrap md:flex-wrap flex-wrap flex gap-x-[105px] gap-y-[17px] justify-between">
        {/* User info section */}
        <div className="flex gap-x-3">
          <div className="h-12 bg-gray-600 aspect-square rounded-full"></div>
          <div className="flex flex-col justify-between">
            <h4 className="text-text">عباس بهبودی</h4>
            <h4 className="text-text-secondary " dir="rtl">
              13 اردیبهشت 1404
            </h4>
          </div>
        </div>
        {/* Chat and phone number section */}
        <div className="flex gap-x-2 h-12">
          {/* Chat */}
          <span className="border-primary border rounded-full h-full aspect-square flex items-center justify-center">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22 11.5667C22 16.8499 17.5222 21.1334 12 21.1334C11.3507 21.1343 10.7032 21.0742 10.0654 20.9545C9.60633 20.8682 9.37678 20.8251 9.21653 20.8496C9.05627 20.8741 8.82918 20.9948 8.37499 21.2364C7.09014 21.9197 5.59195 22.161 4.15111 21.893C4.69874 21.2194 5.07275 20.4112 5.23778 19.5448C5.33778 19.0148 5.09 18.5 4.71889 18.1231C3.03333 16.4115 2 14.1051 2 11.5667C2 6.28357 6.47778 2 12 2C17.5222 2 22 6.28357 22 11.5667Z"
                stroke="#586CFF"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <path
                d="M11.9955 12H12.0045M15.991 12H16M8 12H8.00897"
                stroke="#586CFF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          {/* Phone number */}
          <span className="h-full w-[292px] text-white rounded-full  flex justify-center items-center bg-primary">
            {t("phoneNumber")}: 09064052060
          </span>
        </div>
      </div>
    </div>
  );
}

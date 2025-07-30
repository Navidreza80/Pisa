import { getTranslations } from "next-intl/server";
import SectionName from "../SectionName";
import { MessageCircleMoreIcon } from "lucide-react";
import SaveProperty from "../SaveProperty";
import formatToPersianDate from "@/utils/helper/format-date";
import ChatComponent from "../ChatComponent";

export default async function RentForm({
  houseId,
  sellerName,
  date,
  price,
}: {
  houseId: string;
  sellerName: string;
  date: Date;
  price: number;
}) {
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
          <div className="flex w-full flex-row gap-[5px]">
            {/* Currency */}
            <p className="text-[12px] font-[700] my-auto text-text-secondary ">
              {t("tooman")}
            </p>
            {/* Price */}
            <h1 className="text-[20px] font-[700] !text-text my-auto ">
              {price}
            </h1>
          </div>
        </div>
        <div className="w-[calc(50%-8.5px)] border rounded-[20px] py-3 px-4 border-border h-[93px] text-primary text-[20px] flex flex-col gap-y-3 ">
          {/* Title */}
          {t("rentFrom")}
          {/* Value */}
          <div className="flex w-full flex-row gap-[5px]">
            {/* Currency */}
            <p className="text-[12px] font-[700] my-auto text-text-secondary ">
              {t("tooman")}
            </p>
            {/* Price */}
            <h1 className="text-[20px] font-[700] !text-text my-auto ">
              {price}
            </h1>
          </div>
        </div>
      </div>
      {/* Bottom section */}
      <div className="w-full lg:flex-nowrap md:flex-wrap flex-wrap flex gap-y-[17px] justify-between">
        {/* User info section */}
        <div className="flex gap-x-3">
          <div className="h-12 bg-gray-600 aspect-square rounded-full"></div>
          <div className="flex flex-col justify-between">
            <h4 className="text-text whitespace-nowrap">
              {sellerName || "کاربر"}
            </h4>
            <h4 className="text-text-secondary text-sm whitespace-nowrap">
              {formatToPersianDate(date)}
            </h4>
          </div>
        </div>
        {/* Chat and phone number section */}
        <div className="flex gap-x-2 h-12">
          {/* Chat */}
          <ChatComponent />
          <SaveProperty houseId={houseId} />
          {/* Phone number */}
          <span className="h-full w-[292px] text-white rounded-full  flex justify-center items-center bg-primary">
            {t("phoneNumber")}: 09064052060
          </span>
        </div>
      </div>
    </div>
  );
}

"use client";
import { formatNumber } from "@/utils/helper/format-number";
import Line from "@/components/common/dashboard/line";
import { PinSVG } from "@/components/svg";
import { usePathname } from "next/navigation";
import Link from "next/link";
import ViewMoreSVG from "@/components/dashboard/svg/ViewMoreSVG";
import { useTranslations } from "next-intl";

const Tag = ({ item }) => {
  const t = useTranslations("Dashboard");
  const pathname = usePathname();
  return (
    <div className="w-[calc(50%-10px)] md:w-[calc(50%-10px)] lg:w-[calc(25%-15px)] px-3 md:px-[19px] h-[130px] rounded-xl bg-background flex flex-wrap mb-4 md:mb-0">
      <div className="h-[60px] flex items-center flex-row-reverse gap-x-2.5">
        <div className="flex flex-col flex-wrap gap-1 justify-center">
          {item.textNumber && (
            <p className="font-semibold text-xl h-5">{item.textNumber}</p>
          )}
          <p className="font-medium h-5">{item.text}</p>
        </div>
        <div className="bg-border rounded-b-xl w-[40px] md:w-[50px] h-full flex justify-center items-center">
          <PinSVG />
        </div>
      </div>
      <Line className="!mb-0 w-full" />
      {pathname.endsWith("/finance") ? (
        <div className="font-medium text-center w-full py-[13px] text-[20px]">
          {formatNumber(item.price)} {t("tooman")}
        </div>
      ) : (
        <Link
          href={"/dashboard/seller/" + item.href}
          className="flex justify-between py-2 w-full"
        >
          <p className="font-medium text-text-secondary"> {t("view")} </p>
          <ViewMoreSVG />
        </Link>
      )}
    </div>
  );
};
export default Tag;

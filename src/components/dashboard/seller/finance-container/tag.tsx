"use client";
import { formatNumber } from "@/utils/helper/format-number";
import Line from "../../buyer/line";
import { PinSVG } from "@/components/svg";
import { usePathname } from "next/navigation";
import Link from "next/link";
import ViewMoreSVG from "../../svg/ViewMoreSVG";

const Tag = ({ item }) => {
  const pathname = usePathname();
  return (
    <div className="w-[calc(25%-15px)] px-[19px] h-[130px] rounded-xl bg-background flex flex-row-reverse flex-wrap">
      <div className=" h-[60px] flex items-center flex-row-reverse gap-x-2.5">
        <div className="bg-border rounded-b-xl w-[50px] h-full flex justify-center items-center">
          <PinSVG />
        </div>
        <div className="flex flex-col flex-wrap gap-1 justify-between mt-4">
          {pathname.endsWith("/seller") && (
            <p className="font-semibold text-xl h-5">{item.textNumber}</p>
          )}
          <p className="font-medium h-5">{item.text}</p>
        </div>
      </div>
      <Line className="!mb-0 w-full" />
      {pathname.endsWith("/finance") && (
        <div
          dir="rtl"
          className="font-medium text-center w-full py-[13px] text-[20px]"
        >
          {formatNumber(item.price)} تومان
        </div>
      )}
      {pathname.endsWith("/seller") && (
        <Link
          href={"/dashboard/seller/" + item.href}
          className="flex justify-between py-2 w-full"
        >
          <ViewMoreSVG />
          <p className="font-medium text-text-secondary">مشاهده</p>
        </Link>
      )}
    </div>
  );
};
export default Tag;

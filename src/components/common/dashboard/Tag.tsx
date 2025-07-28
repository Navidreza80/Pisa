import Line from "@/components/common/dashboard/line";
import ViewMoreSVG from "@/components/dashboard/svg/ViewMoreSVG";
import { PinSVG } from "@/components/svg";
import { formatNumber } from "@/utils/helper/format-number";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

const Tag = async ({ item, type = "Dashboard" }) => {
  const t = await getTranslations("Dashboard");

  return (
    <div className=" px-3 w-full md:px-[19px] h-[130px] rounded-xl bg-background flex flex-wrap mb-4 md:mb-0">
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
      {type == "finance" ? (
        <div className="font-medium text-center w-full py-[13px] text-[20px] flex gap-x-2 justify-center items-center">
           {`${formatNumber(item.price)} ${" "} ${t("tooman")}`}
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

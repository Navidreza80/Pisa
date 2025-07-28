"use client";

import { getBookingList } from "@/utils/service/reserve/get";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import TagDashboard from "./TagDashboard";
import { useTranslations } from "next-intl";
import { getOverallSellerStatus } from "@/utils/service/payments/OverallStatus";

const Tags = () => {
  const t = useTranslations("Dashboard");
  const { data: bookingList } = useQuery({








  const buyerItems = {
    cards: [
      {
        type: "reservation",
        title: t("reservationChart"),
        data: chartData,
      },
    ],
  };


  const pathname = usePathname();
  return (
    <>
      {pathname.includes("/seller/finance") && (
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5 animate-fade-up">
          {financeitems.map((item, index) => {
            return <Tag key={index} item={item} />;
          })}
        </div>
      )}
      {(pathname.endsWith("/seller") || pathname.endsWith("/buyer")) && (
        <>
          <div className="w-full flex flex-wrap justify-between md:h-[255px] h-auto md:gap-y-0 gap-y-5 animate-fade-up">
            {pathname.endsWith("/seller") ? (
              <TagDashboard data={sellerItems.cards} />
            ) : pathname.endsWith("/buyer") ? (
              <TagDashboard data={buyerItems.cards} />
            ) : (
              ""
            )}
            <TagDashboard data={dashboarditems2.cards} />
          </div>
        </>
      )}
    </>
  );
};
export default Tags;

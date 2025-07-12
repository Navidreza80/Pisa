"use client";

import { getBookingList } from "@/utils/service/reserve/get";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import Tag from "./Tag";
import TagDashboard from "./TagDashboard";
import { useTranslations } from "next-intl";

const Tags = () => {
  const t = useTranslations("Dashboard")
  const { data: bookingList } = useQuery({
    queryKey: ["BOOKING_LIST"],
    queryFn: getBookingList,
  });

  const reservationCountByDay = {};

  bookingList?.data.forEach((reservation) => {
    const date = reservation.createdAt.split("T")[0];
    reservationCountByDay[date] = (reservationCountByDay[date] || 0) + 1;
  });

  const chartData = Object.keys(reservationCountByDay).map((date) => ({
    date,
    count: reservationCountByDay[date],
  }));

  const financeitems = [
    { text: t("lastMonthIncome"), price: 1200000 },
    { text: t("currentIncome"), price: 1200000 },
    { text: t("totalIncome"), price: 1300000 },
    { text: t("canDeposit"), price: 1400000 },
  ];
  const dashboarditems = [
    { text: t("totalVisit"), textNumber: 4, href: "reservations" },
    {
      text: t("pendingReserves"),
      textNumber: 6,
      href: "reservations",
    },
    { text: t("activeReserves"), textNumber: 5, href: "reservations" },
    {
      text: t("totalProperties"),
      textNumber: 12,
      href: "properties",
    },
  ];

  const dashboarditems2 = {
    cards: [
      {
        type: "profile",
        data: {
          status: {
            label: t("profileStatus"),
            completion: 40,
            minRequired: 2,
            hint: t("hint"),
            lastUpdated: t("lastUpdatedProfile"),
          },
        },
      },
    ],
  };

  const buyerItems = {
    cards: [
      {
        type: "reservation",
        title: t("reservationChart"),
        data: chartData,
      },
    ],
  };

  const sellerItems = {
    cards: [
      {
        type: "income",
        title: t("incomeData"),
        data: {
          totalIncome: {
            label: t("totalIncome"),
            value: 1150000000,
          },
          currentMonthIncome: {
            label: t("currentIncome"),
            value: 195000000,
          },
        },
      },
    ],
  };
  const pathname = usePathname();
  return (
    <>
      {pathname.includes("/seller/finance") && (
        <div className="w-full flex justify-between animate-fade-up">
          {financeitems.map((item, index) => {
            return <Tag key={index} item={item} />;
          })}
        </div>
      )}
      {(pathname.endsWith("/seller") || pathname.endsWith("/buyer")) && (
        <>
          <div className="w-full flex flex-wrap justify-between animate-fade-up">
            {dashboarditems.map((item, index) => {
              return <Tag key={index} item={item} />;
            })}
          </div>
          <div className="w-full flex flex-wrap justify-between md:h-[255px] h-auto md:gap-y-0 gap-y-5 animate-fade-up">
            <TagDashboard data={dashboarditems2.cards} />
            {pathname.endsWith("/seller") ? (
              <TagDashboard data={sellerItems.cards} />
            ) : pathname.endsWith("/buyer") ? (
              <TagDashboard data={buyerItems.cards} />
            ) : (
              ""
            )}
          </div>
        </>
      )}
    </>
  );
};
export default Tags;

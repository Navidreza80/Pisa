"use client";

import { usePathname } from "next/navigation";
import Tag from "./Tag";
import TagDashboard from "./TagDashboard";
import { useQuery } from "@tanstack/react-query";
import getDashboardSummary from "@/utils/service/dashboard/get";
import { getBookingList } from "@/utils/service/reserve/get";

const Tags = () => {
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
    { text: "درآمد ماه قبل", price: 1200000 },
    { text: "درآمد ماه جاری", price: 1200000 },
    { text: "درآمد کل", price: 1300000 },
    { text: "موجودی قابل برداشت", price: 1400000 },
  ];
  const dashboarditems = [
    { text: "بازدید های امروز", textNumber: 4, href: "reservations" },
    {
      text: "رزرو های در انتظار",
      textNumber: 6,
      href: "reservations",
    },
    { text: "رزرو های فعال", textNumber: 5, href: "reservations" },
    {
      text: "کل املاک ها",
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
            label: "وضعیت پروفایل شما",
            completion: 40,
            minRequired: 2,
            hint: "برای اینکه بازدید خوبی داشته باشید، پروفایل شما باید حداقل %70 تکمیل شده باشد.",
            lastUpdated: "3 دقیقه پیش",
          },
        },
      },
    ],
  };

  const buyerItems = {
    cards: [
      {
        type: "reservation",
        title: "نمودار رزرو های شما",
        data: chartData,
      },
    ],
  };

  const sellerItems = {
    cards: [
      {
        type: "income",
        title: "آمار درآمد ها",
        data: {
          totalIncome: {
            label: "درآمد کل",
            value: 1150000000,
          },
          currentMonthIncome: {
            label: "درآمد ماه جاری",
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

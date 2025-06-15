"use client";

import { usePathname } from "next/navigation";
import Tag from "./Tag";
import TagDashboard from "./TagDashboard";

const Tags = () => {
  const financeitems = [
    { text: "درآمد ماه قبل", price: 1200000 },
    { text: "درآمد ماه جاری", price: 1200000 },
    { text: "درآمد کل", price: 1300000 },
    { text: "موجودی قابل برداشت", price: 1400000 },
  ];
  const dashboarditems = [
    { text: "بازدید های امروز", textNumber: 5, href: "reservations" },
    { text: "رزرو های در انتظار", textNumber: 5, href: "reservations" },
    { text: "رزرو های فعال", textNumber: 5, href: "reservations" },
    { text: "کل املاک ها", textNumber: 5, href: "properties" },
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
     { (pathname.endsWith("/seller") || pathname.endsWith("/buyer")) && (
        <>
          <div className="w-full flex flex-wrap justify-between animate-fade-up">
            {dashboarditems.map((item, index) => {
              return <Tag key={index} item={item} />;
            })}
          </div>
          <TagDashboard data={dashboarditems2.cards} />
        </>
      )}
    </>
  );
};
export default Tags;

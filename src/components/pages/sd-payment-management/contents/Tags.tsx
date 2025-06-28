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

  let dashboarditems = [];
  let dashboarditems2 = { cards: [] }; // <-- dashboarditems2 را هم با مقدار پیش فرض خالی تعریف می کنیم

  const pathname = usePathname();

  // بر اساس pathname، dashboarditems و dashboarditems2 را مقداردهی می کنیم
  if (pathname.endsWith("/seller")) {
    dashboarditems = [
      { text: "بازدید های امروز ", textNumber: 10, href: "reservations" },
      { text: "رزرو های در انتظار ", textNumber: 7, href: "reservations" },
      { text: "رزرو های فعال", textNumber: 5, href: "reservations" },
      { text: "کل املاک ها", textNumber: 12, href: "properties" },
    ];
    dashboarditems2 = {
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
          title: "آمار درآمد ها", // <-- عنوان برای seller
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
  } else if (pathname.endsWith("/buyer")) {
    dashboarditems = [
      { text: "علاقه مندی ها", textNumber: 3, href: "reservations" },
      { text: "رزرو های پرداخت نشده", textNumber: 2, href: "reservations" },
      { text: "رزرو های فعال", textNumber: 1, href: "reservations" },
      { text: "کل رزروها", textNumber: 8, href: "favorites" },
    ];
    dashboarditems2 = {
      cards: [
        {
          type: "profile",
          data: {
            status: {
              label: "وضعیت پروفایل شما", // این بخش می تواند مشترک باشد یا با ترجمه مدیریت شود
              completion: 60, 
              minRequired: 2,
              hint: "برای استفاده بهینه از امکانات، پروفایل شما باید حداقل %60 تکمیل شده باشد.",
              lastUpdated: "5 دقیقه پیش",
            },
          },
        },
        {
          type: "reservations_chart", 
          title: "نمودار رزروهای من", 
          data: {
            totalReservations: {
              label: "کل رزروها",
              value: 25,
            },
            completedReservations: {
              label: "رزروهای تکمیل شده",
              value: 20,
            },
            
          },
        },
      ],
    };
  }

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
          <TagDashboard data={dashboarditems2.cards} />
        </>
      )}
    </>
  );
};

export default Tags;
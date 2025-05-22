import React from "react";
import BuyerSideBarItems from "./buyerSideBarItems";
import DashboardSVG from "../svg/DashboardSVG";
import InfoSVG from "../svg/InfoSVG";
import NotifSVG from "../svg/NotifSVG";
import PaymentSVG from "../svg/PaymentSVG";
import FavoriteSVG from "../svg/FavoriteSVG";
import ReserveSVG from "../svg/ReserveSVG";
import SignoutSVG from "../svg/SignoutSVG";
import MoneySVG from "../svg/MoneySVG";
import PropertySVG from "../svg/propertySVG";
import ReviewsSVG from "../svg/reviewsSVG";

function BuyerSideBar({ seller = false }) {
  const sellerItems = [
    { name: "داشبورد", icon: <DashboardSVG />, href: "/dashboard/seller" },
    { name: "اطلاعات کاربری", icon: <InfoSVG />, href: "/dashboard/seller/profile" },
    { name: "مدیریت املاک", icon: <PropertySVG />, href: "/dashboard/seller/properties" },
    { name: "مدیریت رزروها", icon: <ReserveSVG />, href: "/dashboard/seller/reservations" },
    { name: "مدیریت مالی", icon: <PaymentSVG />, href: "/dashboard/seller/finance" },
    { name: "مدیریت نظرات", icon: <ReviewsSVG />, href: "/dashboard/seller/reviews" },
    { name: "اعلان‌ها", icon: <NotifSVG />, href: "/dashboard/seller/notifications" },
  ];

  const buyerItems = [
    { name: "داشبورد", icon: <DashboardSVG />, href: "/dashboard/buyer" },
    { name: "اطلاعات کاربری", icon: <InfoSVG />, href: "/dashboard/buyer/information" },
    { name: "مدیریت رزروها", icon: <ReserveSVG />, href: "/dashboard/buyer/reservations" },
    { name: "علاقه‌مندی‌ها", icon: <FavoriteSVG />, href: "/dashboard/buyer/favorites" },
    { name: "پرداخت‌ها", icon: <PaymentSVG />, href: "/dashboard/buyer/payments" },
    { name: "اعلان‌ها", icon: <NotifSVG />, href: "/dashboard/buyer/notifications" },
  ];

  const items = seller ? sellerItems : buyerItems;

  return (
    <div className="h-[calc(100vh-32px)] sticky top-[19px] rounded-[12px] bg-background p-4 flex flex-col flex-wrap justify-between">
      <div className="mt-2">
        <div className="flex justify-between">
          <div className="my-auto">
            <SignoutSVG />
          </div>
          <h2 className="text-text text-4xl font-bold font-yekan">Piza</h2>
        </div>

        <div dir="rtl" className="flex flex-col gap-4 mt-13">
          {items.map((item, index) => (
            <BuyerSideBarItems
              key={index}
              name={item.name}
              icon={item.icon}
              href={item.href}
            />
          ))}
        </div>
      </div>

      <div className="mt-6 py-3 px-5 border-[2px] border-text-secondary border-dashed rounded-[18px] flex justify-end gap-2">
        <div className="flex flex-col flex-wrap justify-between">
          <p className="text-[20px] text-text "> نظرات جدید</p>
          <p className="text-text-secondary text-[14px] ">5 نظر</p>
        </div>
        <div className="mb-auto pt-[2px]">
          <ReviewsSVG />
        </div>
      </div>
    </div>
  );
}

export default BuyerSideBar;

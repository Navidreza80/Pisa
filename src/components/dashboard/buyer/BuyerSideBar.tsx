"use client";

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
import { usePathname } from "@/i18n/navigation";
import TourManagementSVG from "../svg/TourManagementSVG";

function BuyerSideBar() {
  const pathname = usePathname();
  const isSeller = pathname.includes("/seller");
  const sellerItems = [
    { name: "داشبورد", icon: <DashboardSVG />, href: "/dashboard/seller" },
    {
      name: "اطلاعات کاربری",
      icon: <InfoSVG />,
      href: "/dashboard/seller/profile",
    },
    {
      name: "مدیریت املاک",
      icon: <PropertySVG />,
      href: "/dashboard/seller/properties",
      management: true,
    },
    {
      name: "مدیریت رزروها",
      icon: <ReserveSVG />,
      href: "/dashboard/seller/reservations",
      management: true,
    },
    {
      name: "مدیریت مالی",
      icon: <PaymentSVG />,
      href: "/dashboard/seller/finance",
      management: true,
    },
    {
      name: "مدیریت نظرات",
      icon: <ReviewsSVG />,
      href: "/dashboard/seller/reviews",
      management: true,
    },
    {
      name: "اعلان‌ها",
      icon: <NotifSVG />,
      href: "/dashboard/seller/notifications",
    },
    {
      name: "مدیریت تور ها",
      icon: <TourManagementSVG />,
      href: "/dashboard/seller/Tour",
      management: true,
    },
  ];

  const buyerItems = [
    { name: "داشبورد", icon: <DashboardSVG />, href: "/dashboard/buyer" },
    {
      name: "اطلاعات کاربری",
      icon: <InfoSVG />,
      href: "/dashboard/buyer/information",
    },
    {
      name: "مدیریت رزروها",
      icon: <ReserveSVG />,
      href: "/dashboard/buyer/reservations",
    },
    {
      name: "علاقه‌مندی‌ها",
      icon: <FavoriteSVG />,
      href: "/dashboard/buyer/favorites",
    },
    {
      name: "پرداخت‌ها",
      icon: <PaymentSVG />,
      href: "/dashboard/buyer/payments",
    },
    {
      name: "اعلان‌ها",
      icon: <NotifSVG />,
      href: "/dashboard/buyer/notifications",
    },
  ];

  const items = isSeller ? sellerItems : buyerItems;

  return (
    <div className="h-[calc(100vh-32px)] sticky top-[19px] rounded-[12px] bg-background p-4 flex flex-col flex-wrap justify-between">
      <div>
        <div className="flex justify-between mt-2">
          <div className="my-auto">
            <SignoutSVG />
          </div>
          <h2 className="text-text text-4xl font-bold font-yekan">Piza</h2>
        </div>

        <div dir="rtl" className="flex flex-col gap-4 mt-10">
            <BuyerSideBarItems
              items={items}
            />
        </div>
      </div>
      {isSeller ? (
        <div className="mt-6 py-3 px-5 border-[2px] border-text-secondary border-dashed rounded-[18px] flex justify-end gap-2">
          <div className="flex flex-col flex-wrap justify-between">
            <p className="text-[20px] text-text ">نظرات جدید</p>
            <p className="text-text-secondary text-[14px] ">5 نظر</p>
          </div>
          <div className="mb-auto pt-[2px]">
            <ReviewsSVG />
          </div>
        </div>
      ) : (
        <div className="mt-6 py-3 px-5 border-[2px] border-text-secondary border-dashed rounded-[18px] flex justify-end gap-2">
          <div className="flex flex-col flex-wrap justify-between">
            <p className="text-[20px] text-text ">کیف پول</p>
            <p className="text-text-secondary text-[14px] ">عدم موجودی</p>
          </div>
          <div className="my-auto">
            <MoneySVG />
          </div>
        </div>
      )}
    </div>
  );
}

export default BuyerSideBar;

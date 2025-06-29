"use client";

import { usePathname } from "@/i18n/navigation";
import { House } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import DashboardSVG from "../../dashboard/svg/DashboardSVG";
import FavoriteSVG from "../../dashboard/svg/FavoriteSVG";
import InfoSVG from "../../dashboard/svg/InfoSVG";
import MoneySVG from "../../dashboard/svg/MoneySVG";
import NotifSVG from "../../dashboard/svg/NotifSVG";
import PaymentSVG from "../../dashboard/svg/PaymentSVG";
import PropertySVG from "../../dashboard/svg/propertySVG";
import ReserveSVG from "../../dashboard/svg/ReserveSVG";
import ReviewsSVG from "../../dashboard/svg/reviewsSVG";
import SignoutSVG from "../../dashboard/svg/SignoutSVG";
import BuyerSideBarItems from "./buyerSideBarItems";
import MobileBottomNavbar from "./MobileBottomNav";

function BuyerSideBar() {
  const pathname = usePathname();
  const isSeller = pathname.includes("/seller");
  const t = useTranslations("Sidebar");

  const sellerItems = [
    { name: t("dashboard"), icon: <DashboardSVG />, href: "/dashboard/seller" },
    {
      name: t("userInformation"),
      icon: <InfoSVG />,
      href: "/dashboard/seller/profile",
    },
    {
      name: t("propertyManagement"),
      icon: <PropertySVG />,
      href: "/dashboard/seller/properties",
    },
    {
      name: t("reservationManagement"),
      icon: <ReserveSVG />,
      href: "/dashboard/seller/reservations",
    },
    {
      name: t("financialManagement"),
      icon: <PaymentSVG />,
      href: "/dashboard/seller/finance",
    },
  ];

  const buyerItems = [
    { name: t("dashboard"), icon: <DashboardSVG />, href: "/dashboard/buyer" },
    {
      name: t("userInformation"),
      icon: <InfoSVG />,
      href: "/dashboard/buyer/information",
    },
    {
      name: t("reservationManagement"),
      icon: <ReserveSVG />,
      href: "/dashboard/buyer/reservations",
    },
    {
      name: t("favorites"),
      icon: <FavoriteSVG />,
      href: "/dashboard/buyer/favorites",
    },
    {
      name: t("payments"),
      icon: <PaymentSVG />,
      href: "/dashboard/buyer/payments",
    },
    {
      name: t("notifications"),
      icon: <NotifSVG />,
      href: "/dashboard/buyer/notifications",
    },
  ];

  const items = isSeller ? sellerItems : buyerItems;

  const [collapsed, setCollapsed] = useState(false);

  const toggleSideBar = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <>
      <div
        className={`${!collapsed ? "lg:w-[19%] md:w-[70px] w-[70px]" : " w-[70px]"} transition-all duration-300 animate-fade-left lg:block md:block hidden`}
      >
        <div className="h-[calc(100vh-32px)] sticky top-[19px] rounded-[12px] bg-background p-4 flex flex-col flex-wrap justify-between">
          <div>
            <div
              className={`flex ${!collapsed ? "lg:justify-between md:justify-center justify-center" : "justify-center"} mt-2`}
            >
              <div
                className={`cursor-pointer my-auto lg:block md:hidden hidden ${collapsed ? "rotate-180" : ""}`}
                onClick={toggleSideBar}
              >
                <SignoutSVG />
              </div>
              <div>
                <House className="cursor-pointer lg:hidden md:block block" />
              </div>
              {!collapsed && (
                <h2 className="text-text text-4xl font-bold font-yekan lg:block md:hidden hidden">
                  Piza
                </h2>
              )}
            </div>

            <div dir="rtl" className="flex flex-col gap-4 mt-10">
              <BuyerSideBarItems collapsed={collapsed} items={items} />
            </div>
          </div>
          {isSeller && !collapsed ? (
            <div className="mt-6 py-3 px-5 border-[2px] border-text-secondary border-dashed rounded-[18px] lg:flex md:hidden hidden justify-end gap-2">
              <div className="flex flex-col flex-wrap justify-between">
                <p className="text-[20px] text-text ">{t("newReviews")}</p>
                <p className="text-text-secondary text-[14px] ">
                  {t("reviewCount", { count: 5 })}
                </p>
              </div>
              <div className="mb-auto pt-[2px]">
                <ReviewsSVG />
              </div>
            </div>
          ) : (
            !collapsed && (
              <div className="lg:flex md:hidden hidden mt-6 py-3 px-5 border-[2px] border-text-secondary border-dashed rounded-[18px] justify-end gap-2">
                <div className="flex flex-col flex-wrap justify-between">
                  <p className="text-[20px] text-text ">{t("wallet")}</p>
                  <p className="text-text-secondary text-[14px] ">
                    {t("noBalance")}
                  </p>
                </div>
                <div className="my-auto">
                  <MoneySVG />
                </div>
              </div>
            )
          )}
        </div>
      </div>
      <MobileBottomNavbar />
    </>
  );
}

export default BuyerSideBar;

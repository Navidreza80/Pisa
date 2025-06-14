"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronUp, ChevronDown } from "lucide-react";
import { usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import DashboardSVG from "../../dashboard/svg/DashboardSVG";
import FavoriteSVG from "../../dashboard/svg/FavoriteSVG";
import InfoSVG from "../../dashboard/svg/InfoSVG";
import PaymentSVG from "../../dashboard/svg/PaymentSVG";
import NotifSVG from "../../dashboard/svg/NotifSVG";
import ReserveSVG from "../../dashboard/svg/ReserveSVG";
import PropertySVG from "@/components/dashboard/svg/propertySVG";
import ReviewsSVG from "@/components/dashboard/svg/reviewsSVG";
import TourManagementSVG from "@/components/dashboard/svg/TourManagementSVG";

export default function MobileBottomNavbar() {
  const pathname = usePathname();
  const t = useTranslations("Sidebar");
  const [showMore, setShowMore] = useState(false);

  const isSeller = pathname.includes("/seller");

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
      management: true,
    },
    {
      name: t("reservationManagement"),
      icon: <ReserveSVG />,
      href: "/dashboard/seller/reservations",
      management: true,
    },
    {
      name: t("financialManagement"),
      icon: <PaymentSVG />,
      href: "/dashboard/seller/finance",
      management: true,
    },
    {
      name: t("reviewManagement"),
      icon: <ReviewsSVG />,
      href: "/dashboard/seller/reviews",
      management: true,
    },
    {
      name: t("notifications"),
      icon: <NotifSVG />,
      href: "/dashboard/seller/notifications",
    },
    {
      name: t("tourManagement"),
      icon: <TourManagementSVG />,
      href: "/dashboard/seller/Tour",
      management: true,
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
      name: t("reservationManagement"),
      icon: <ReserveSVG />,
      href: "/dashboard/buyer/reservations",
      management: true,
    },
    {
      name: t("locationManagement"),
      icon: <ReserveSVG />,
      href: "/dashboard/buyer/locations",
      management: true,
    },
  ];

  const items = isSeller ? sellerItems : buyerItems;
  const mainItems = items.filter((item) => !item.management).slice(0, 4);
  const managementItems = items.filter((item) => item.management);

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-gray-200 z-50 md:hidden">
      <div className="flex justify-around items-stretch h-16 relative">
        {/* Main navigation items */}
        {mainItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center justify-center flex-1 p-2 ${
              pathname === item.href ? "text-primary" : "text-gray-500"
            }`}
            onClick={() => setShowMore(false)}
          >
            <div className="w-6 h-6">{item.icon}</div>
            <span className="text-xs mt-1">{item.name}</span>
            {pathname === item.href && (
              <div className="w-1/2 h-1 bg-primary rounded-t-full mt-1"></div>
            )}
          </Link>
        ))}

        {/* More button for management items */}
        <button
          className={`flex flex-col items-center justify-center flex-1 p-2 ${
            showMore ? "text-primary" : "text-gray-500"
          }`}
          onClick={() => setShowMore(!showMore)}
        >
          <div className="w-6 h-6">
            {showMore ? <ChevronDown size={24} /> : <ChevronUp size={24} />}
          </div>
          <span className="text-xs mt-1">بیشتر</span>
        </button>

        {/* Management items dropdown */}
        {showMore && (
          <div className="absolute bottom-full left-0 right-0 bg-background shadow-lg border-t border-gray-200 rounded-t-lg py-2 animate-in fade-in slide-in-from-bottom-2">
            {managementItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center px-4 py-3 ${
                  pathname === item.href ? "text-primary" : "text-gray-500"
                }`}
                onClick={() => setShowMore(false)}
              >
                <div className="w-6 h-6 mr-2">{item.icon}</div>
                <span className="text-sm">{item.name}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}

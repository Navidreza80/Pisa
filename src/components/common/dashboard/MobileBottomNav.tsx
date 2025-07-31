"use client";

import FavoriteSVG from "@/components/dashboard/svg/FavoriteSVG";
import PaymentSVG from "@/components/dashboard/svg/PaymentSVG";
import PropertySVG from "@/components/dashboard/svg/propertySVG";
import { usePathname } from "@/i18n/navigation";
import {
  Bell,
  Bookmark,
  MessageCircleMoreIcon,
  MessageSquare,
} from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import DashboardSVG from "../../dashboard/svg/DashboardSVG";
import InfoSVG from "../../dashboard/svg/InfoSVG";
import ReserveSVG from "../../dashboard/svg/ReserveSVG";

export default function MobileBottomNavbar() {
  const pathname = usePathname();
  const t = useTranslations("Sidebar");

  const isSeller = pathname.includes("/seller");

  const sellerItems = [
    { name: t("dashboard"), icon: <DashboardSVG />, href: "/dashboard/seller" },
    {
      name: t("propertyManagement"),
      icon: <PropertySVG />,
      href: "/dashboard/seller/properties",
    },
    {
      name: t("financialManagement"),
      icon: <PaymentSVG />,
      href: "/dashboard/seller/finance",
    },
    {
      name: t("reservationManagement"),
      icon: <ReserveSVG />,
      href: "/dashboard/seller/reservations",
    },
    {
      name: "نظرات",
      icon: <MessageSquare />,
      href: "/dashboard/seller/comments",
    },
    {
      name: "گفتگو",
      icon: <MessageCircleMoreIcon />,
      href: "/dashboard/seller/chats",
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
      name: t("notifications"),
      icon: <Bell />,
      href: "/dashboard/buyer/notifications",
    },
    {
      name: t("payments"),
      icon: <PaymentSVG />,
      href: "/dashboard/buyer/payments",
    },
    {
      name: t("favorites"),
      icon: <FavoriteSVG />,
      href: "/dashboard/buyer/favorites",
    },
    {
      name: "ذخیره شده ها",
      icon: <Bookmark />,
      href: "/dashboard/buyer/whishlist",
    },
    {
      name: "گفتگو",
      icon: <MessageCircleMoreIcon />,
      href: "/dashboard/buyer/chats",
    },
  ];

  const items = isSeller ? sellerItems : buyerItems;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-gray-200 z-50 md:hidden">
      <div className="flex justify-around items-stretch h-16 relative">
        {/* Main navigation items */}
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center justify-center flex-1 p-2 ${
              pathname === item.href ? "text-primary" : "text-gray-500"
            }`}
          >
            <div className="w-6 h-6">{item.icon}</div>
            {pathname === item.href && (
              <div className="w-1/2 h-1 bg-primary rounded-t-full mt-1"></div>
            )}
          </Link>
        ))}
      </div>
    </nav>
  );
}

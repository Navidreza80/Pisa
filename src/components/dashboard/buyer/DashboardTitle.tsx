"use client";

import { usePathname } from "@/i18n/navigation";
import HeaderTitleSVG from "../svg/HeaderTitleSVG";
import LogoSVG from "@/components/common/svg/logo";

export default function DashboardTitle() {
  const pathname = usePathname();
  const isSeller = pathname.includes("/seller");

  const getTitle = () => {
    if (isSeller) {
      if (
        pathname.includes("/dashboard") &&
        !pathname.includes("/properties") &&
        !pathname.includes("/reservations") &&
        !pathname.includes("/information") &&
        !pathname.includes("/finance") &&
        !pathname.includes("/reviews") &&
        !pathname.includes("/Tour") &&
        !pathname.includes("/notification")
      ) {
        return "داشبورد";
      } else if (pathname.includes("/properties")) {
        return "مدیریت املاک ها";
      } else if (pathname.includes("/reservations")) {
        return "مدیریت رزروها";
      } else if (pathname.includes("/information")) {
        return "اطلاعات کاربری";
      } else if (pathname.includes("/finance")) {
        return "مدیریت مالی";
      } else if (pathname.includes("/reviews")) {
        return "مدیریت نظرات";
      } else if (pathname.includes("/notification")) {
        return "اعلان‌ها";
      } else if (pathname.includes("/Tour")) {
        return "مدیریت تور ها";
      }

      return "داشبورد";
    } else {
      if (
        pathname.includes("/dashboard") &&
        !pathname.includes("/information") &&
        !pathname.includes("/reservations") &&
        !pathname.includes("/favorites") &&
        !pathname.includes("/payments") &&
        !pathname.includes("/notifications")
      ) {
        return "داشبورد";
      } else if (pathname.includes("/information")) {
        return "اطلاعات کاربری";
      } else if (pathname.includes("/reservations")) {
        return "مدیریت رزروها";
      } else if (pathname.includes("/favorites")) {
        return "علاقه‌مندی‌ها";
      } else if (pathname.includes("/payments")) {
        return "پرداخت‌ها";
      } else if (pathname.includes("/notifications")) {
        return "اعلان‌ها";
      }
      return "داشبورد";
    }
  };

  return (
    <div className="flex gap-2">
      {isSeller ? (
        <div className="my-auto">
          <HeaderTitleSVG />
        </div>
      ) : (
        " "
      )}
      <LogoSVG size="w-20 md:block block lg:hidden" />
      <h2
        className={`text-xl md:hidden hidden lg:block font-bold my-auto font-yekan text-text${
          isSeller ? "text-orange-600 " : " "
        }`}
      >
        {getTitle()}
      </h2>
    </div>
  );
}

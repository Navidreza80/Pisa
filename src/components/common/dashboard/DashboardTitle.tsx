"use client";

import { usePathname } from "@/i18n/navigation";
import HeaderTitleSVG from "../../dashboard/svg/HeaderTitleSVG";
import LogoSVG from "@/components/common/svg/logo";
import { useTranslations } from "next-intl";

export default function DashboardTitle() {
  const pathname = usePathname();
  const isSeller = pathname.includes("/seller");
  const t = useTranslations('Dashboard');

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
        return t('dashboard');
      } else if (pathname.includes("/properties")) {
        return t('propertyManagement');
      } else if (pathname.includes("/reservations")) {
        return t('reservationManagement');
      } else if (pathname.includes("/information")) {
        return t('userInformation');
      } else if (pathname.includes("/finance")) {
        return t('financialManagement');
      } else if (pathname.includes("/reviews")) {
        return t('reviewManagement');
      } else if (pathname.includes("/notification")) {
        return t('notifications');
      } else if (pathname.includes("/Tour")) {
        return t('tourManagement');
      }

      return t('dashboard');
    } else {
      if (
        pathname.includes("/dashboard") &&
        !pathname.includes("/information") &&
        !pathname.includes("/reservations") &&
        !pathname.includes("/favorites") &&
        !pathname.includes("/payments") &&
        !pathname.includes("/notifications")
      ) {
        return t('dashboard');
      } else if (pathname.includes("/information")) {
        return t('userInformation');
      } else if (pathname.includes("/reservations")) {
        return t('reservationManagement');
      } else if (pathname.includes("/favorites")) {
        return t('favorites');
      } else if (pathname.includes("/payments")) {
        return t('payments');
      } else if (pathname.includes("/notifications")) {
        return t('notifications');
      }
      return t('dashboard');
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
import HeaderDashboard from "@/components/common/dashboard/HeaderDashboard";
import IncomeCard from "@/components/common/dashboard/IncomeCard";
import ProfileCard from "@/components/common/dashboard/ProfileCard";
import Tag from "@/components/common/dashboard/Tag";
import ViewMoreSVG from "@/components/dashboard/svg/ViewMoreSVG";
import { getOverallSellerStatus } from "@/utils/service/payments/OverallStatus";
import { GetSellerBooking } from "@/utils/service/reserve/GetSellerBookings";
import { getServerCookie } from "@/utils/service/storage/server-cookie";
import { getUserInfo } from "@/utils/service/user/get";
import { getUserActivity } from "@/utils/service/user/UserActivity";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import SellerReservationManagement from "../../sd-booking-management/container";

const SellerMain = async () => {
  const t = await getTranslations("Dashboard");
  const userActivity = await getUserActivity();
  const incomeInfo = await getOverallSellerStatus();
  const userId = await getServerCookie("userId");
  const profileInfo = userId && (await getUserInfo(userId));
  const sellerTags = [
    {
      text: "کل املاک ها",
      textNumber: userActivity.housesCreated,
      href: "properties",
    },
    {
      text: "رزرو های فعال",
      textNumber: 6,
      href: "reservations",
    },
    { text: "رزرو های در انتظار", textNumber: 5, href: "reservations" },
    {
      text: "بازدید های امروز",
      textNumber: 12,
      href: "properties",
    },
  ];
  const incomeCard = {
    title: t("incomeData"),
    totalIncome: {
      label: t("totalIncome"),
      value: incomeInfo.totalAmount,
    },
    currentMonthIncome: {
      label: t("currentIncome"),
      value: incomeInfo.totalCurrentMonthAmount,
    },
  };
  const data = await GetSellerBooking({
    limit: "5",
  });
  return (
    <>
      <HeaderDashboard title={t("dashboard")} />
      <div className="grid gap-[19px] lg:grid-cols-4 md:grid-cols-2 grid-cols-1">
        {sellerTags.map((tag) => (
          <Tag key={tag.text} item={tag} />
        ))}
      </div>
      <div className="grid lg:grid-cols-2 grid-cols-1 w-full gap-[19px]">
        {profileInfo && (
          <ProfileCard
            lastUpdated={profileInfo?.user.updatedAt}
            completed={profileInfo?.additionalPercentage}
          />
        )}
        <IncomeCard data={incomeCard} />
      </div>
      <SellerReservationManagement
        totalCount={data.totalCount}
        bookings={data.bookings}
        isFilter={false}
        endItem={
          <Link
            href="/dashboard/seller/reservations"
            className="flex items-center gap-2"
          >
            <p className="text-text-secondary">مشاهده همه</p>
            <ViewMoreSVG />
          </Link>
        }
      />
    </>
  );
};
export default SellerMain;

import HeaderDashboard from "@/components/common/dashboard/HeaderDashboard";
import ProfileCard from "@/components/common/dashboard/ProfileCard";
import Tag from "@/components/common/dashboard/Tag";
import BuyerDashboardMain from "@/components/pages/bd-main/container";
import ReservationChart from "@/components/pages/sd-payment-management/contents/ReservationChart";
import { getBookingList } from "@/utils/service/reserve/get";
import { getServerCookie } from "@/utils/service/storage/server-cookie";
import { getUserInfo } from "@/utils/service/user/get";
import { getUserActivity } from "@/utils/service/user/UserActivity";
import { getTranslations } from "next-intl/server";

type Reservation = {
  createdAt: string;
};

type ChartDatum = {
  date: string;
  count: number;
};

const Page = async () => {
  const t = await getTranslations("Dashboard");
  const userActivity = await getUserActivity();
  const bookingList = await getBookingList();
  const userId = await getServerCookie("userId");
  const profileInfo = userId && (await getUserInfo(userId));

  const reservationCountByDay = bookingList.data.reduce<Record<string, number>>(
    (acc, reservation: Reservation) => {
      const date = reservation.createdAt.split("T")[0];
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    },
    {}
  );

  const chartData: ChartDatum[] = Object.entries(reservationCountByDay).map(
    ([date, count]) => ({
      date,
      count,
    })
  );

  const buyerTags = [
    {
      text: "کل رزرو ها",
      textNumber: userActivity.bookingCount,
      href: "properties",
    },
    {
      text: "رزرو های فعال",
      textNumber: userActivity.bookingCount,
      href: "reservations",
    },
    {
      text: "رزرو های پرداخت نشده",
      textNumber: userActivity.bookingCount,
      href: "reservations",
    },
    {
      text: "علاقه مندی ها",
      textNumber: 12,
      href: "favorites",
    },
  ];
  return (
    <>
      <HeaderDashboard title={t("dashboard")} />
      <div className="grid gap-[19px] lg:grid-cols-4 md:grid-cols-2 grid-cols-1">
        {buyerTags.map((tag) => (
          <Tag key={tag.text} item={tag} />
        ))}
      </div>
      <div className="grid grid-cols-2 w-full gap-[19px]">
        <ReservationChart data={chartData} title={"نمودار رزرو های شما"} />
        {profileInfo && (
          <ProfileCard
            lastUpdated={profileInfo?.user.updatedAt}
            completed={profileInfo?.additionalPercentage}
          />
        )}
      </div>
      <BuyerDashboardMain />
    </>
  );
};
export default Page;

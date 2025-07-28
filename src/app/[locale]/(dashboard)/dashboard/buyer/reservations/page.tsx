import HeaderDashboard from "@/components/common/dashboard/HeaderDashboard";
import BookingList from "@/components/pages/bd-bookings/container";
import { getBookingList } from "@/utils/service/reserve/get";
import { getTranslations } from "next-intl/server";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page: string; sort: string; order: string }>;
}) {
  const t = await getTranslations("Dashboard");
  const { page, sort = "createdAt", order } = await searchParams;
  const data = await getBookingList({ page, limit: 5, sort, order });

  return (
    <>
      {" "}
      <HeaderDashboard title={t("reservationManagement")} />
      <BookingList bookingList={data} />
    </>
  );
}

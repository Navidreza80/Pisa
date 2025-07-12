import { getBookingList } from "@/utils/service/reserve/get";
import BookingList from "../../bd-bookings/container";
import { getTranslations } from "next-intl/server";

export default async function BuyerDashboardMain() {
  const t = await getTranslations("Dashboard")
  const data = await getBookingList({
    page: 1,
    limit: 3,
    sort: "created_at",
    order: "DESC",
  });
  return <BookingList title={t("recentBookings")} noFilter bookingList={data} />;
}

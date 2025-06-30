import { getBookingList } from "@/utils/service/reserve/get";
import BookingList from "../../bd-bookings/container";

export default async function BuyerDashboardMain() {
  const data = await getBookingList({
    page: 1,
    limit: 3,
    sort: "created_at",
    order: "DESC",
  });
  return <BookingList title="رزرو های اخیر" noFilter bookingList={data} />;
}

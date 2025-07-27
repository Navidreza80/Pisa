import BookingList from "@/components/pages/bd-bookings/container";
import { getBookingList } from "@/utils/service/reserve/get";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page: string; sort: string; order: string }>;
}) {
  const { page, sort = "createdAt", order } = await searchParams;
  const data = await getBookingList({ page, limit: 5, sort, order });


  return <BookingList bookingList={data} />;
}

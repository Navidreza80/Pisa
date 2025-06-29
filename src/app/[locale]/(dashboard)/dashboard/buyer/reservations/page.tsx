import BookingList from "@/components/pages/bd-bookings/container";
import { getBookingList } from "@/utils/service/reserve/get";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page: string; sort: string; order: string }>;
}) {
  const { page, sort, order } = await searchParams;
  const data = await getBookingList({ page, limit: 2, sort, order });
  console.log(data)

  return <BookingList bookingList={data} />;
}

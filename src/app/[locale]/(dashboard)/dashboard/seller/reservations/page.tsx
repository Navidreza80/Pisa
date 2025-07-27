import SellerReservationManagement from "@/components/pages/sd-booking-management/container";
import { GetSellerBooking } from "@/utils/service/reserve/GetSellerBookings";

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{
    page: string;
    status: string;
    sort: string;
    order: string;
  }>;
}) => {
  const { page, status, sort, order } = await searchParams;
  const data = await GetSellerBooking({
    limit: "5",
    sort,
    order,
    page: page || "1",
    ...(status !== "all" && status && { status: status }),
  });
  return (
    <SellerReservationManagement
      bookings={data.bookings}
      totalCount={data.totalCount}
    />
  );
};
export default Page;

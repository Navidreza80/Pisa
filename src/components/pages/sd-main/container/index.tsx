import ViewMoreSVG from "@/components/dashboard/svg/ViewMoreSVG";
import SellerReservationManagement from "../../sd-booking-management/container";
import Link from "next/link";
import { GetSellerBooking } from "@/utils/service/reserve/GetSellerBookings";

const SellerMain = async () => {
  const data = await GetSellerBooking({
    limit: "5",
  });
  return (
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
  );
};
export default SellerMain;

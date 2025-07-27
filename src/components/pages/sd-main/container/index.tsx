import ViewMoreSVG from "@/components/dashboard/svg/ViewMoreSVG";
import SellerReservationManagement from "../../sd-booking-management/container";
import Link from "next/link";

const SellerMain = () => {
  return (
    <SellerReservationManagement
      limit={5}
      isFilter={false}
      endItem={
        <Link href="/dashboard/seller/reservations" className="flex items-center gap-2">
          <p className="text-text-secondary">مشاهده همه</p>
          <ViewMoreSVG />
        </Link>
      }
    />
  );
};
export default SellerMain;

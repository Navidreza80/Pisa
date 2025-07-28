import HeaderDashboard from "@/components/common/dashboard/HeaderDashboard";
import SellerReservationManagement from "@/components/pages/sd-booking-management/container";
import { GetSellerBooking } from "@/utils/service/reserve/GetSellerBookings";
import { getTranslations } from "next-intl/server";

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
  const t = await getTranslations("Dashboard");
  const { page, status, sort, order } = await searchParams;
  const data = await GetSellerBooking({
    limit: "5",
    sort,
    order,
    page: page || "1",
    ...(status !== "all" && status && { status: status }),
  });
  return (
    <>
      <HeaderDashboard title={t("reservationManagement")} />
      <SellerReservationManagement
        bookings={data.bookings}
        totalCount={data.totalCount}
      />
    </>
  );
};
export default Page;

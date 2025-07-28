import HeaderDashboard from "@/components/common/dashboard/HeaderDashboard";
import BuyerPayments from "@/components/pages/bd-payments/container";
import { getAllPayments } from "@/utils/service/payments/get";
import { getTranslations } from "next-intl/server";

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const t = await getTranslations("Dashboard");
  const { page } = await searchParams;
  const paymentList = await getAllPayments({ page, limit: "5" });
  return (
    <>
      <HeaderDashboard title={t("payments")} />
      <BuyerPayments
        paymentList={paymentList}
        totalCount={paymentList.totalCount}
      />
    </>
  );
};
export default Page;

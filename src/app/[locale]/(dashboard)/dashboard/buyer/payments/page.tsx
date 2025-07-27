import BuyerPayments from "@/components/pages/bd-payments/container";
import { getAllPayments } from "@/utils/service/payments/get";

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const { page } = await searchParams;
  const paymentList = await getAllPayments({ page, limit: "5" });
  return (
    <BuyerPayments
      paymentList={paymentList}
      totalCount={paymentList.totalCount}
    />
  );
};
export default Page;

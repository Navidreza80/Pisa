import SellerFinanceManagement from "@/components/pages/sd-payment-management/container";
import { getSellerPayments } from "@/utils/service/payments/SellerPayments";

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{
    page: string;
  }>;
}) => {
  const { page } = await searchParams;
  const payments = await getSellerPayments({ page, limit: "5" });
  return <SellerFinanceManagement payments={payments.data} totalCount={payments.totalCount} />;
};
export default Page;

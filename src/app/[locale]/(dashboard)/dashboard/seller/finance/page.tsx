import SellerFinanceManagement from "@/components/pages/sd-payment-management/container";
import { getSellerPayments } from "@/utils/service/payments/SellerPayments";

const Page = async () => {
  const payments = await getSellerPayments();
  return <SellerFinanceManagement payments={payments} />;
};
export default Page;

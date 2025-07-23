import BuyerPayments from "@/components/pages/bd-payments/container";
import { getAllPayments } from "@/utils/service/payments/get";

const Page = async () => {
  const paymentList = await getAllPayments()
  return <BuyerPayments paymentList={paymentList} />;
};
export default Page;

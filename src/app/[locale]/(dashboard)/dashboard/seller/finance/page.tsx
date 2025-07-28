import HeaderDashboard from "@/components/common/dashboard/HeaderDashboard";
import Tag from "@/components/common/dashboard/Tag";
import SellerFinanceManagement from "@/components/pages/sd-payment-management/container";
import { getOverallSellerStatus } from "@/utils/service/payments/OverallStatus";
import { getSellerPayments } from "@/utils/service/payments/SellerPayments";
import { getTranslations } from "next-intl/server";

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{
    page: string;
  }>;
}) => {
  const t = await getTranslations("Dashboard");
  const incomeInfo = await getOverallSellerStatus();
  const financeItems = [
    {
      text: t("lastMonthIncome"),
      price: incomeInfo.totalPerviousMonthAmount,
    },
    { text: t("currentIncome"), price: incomeInfo.totalCurrentMonthAmount },
    { text: t("totalIncome"), price: incomeInfo.totalAmount },
    { text: t("canDeposit"), price: incomeInfo.totalAmount },
  ];
  const { page } = await searchParams;
  const payments = await getSellerPayments({ page, limit: "5" });

  return (
    <>
      <HeaderDashboard title={t("financialManagement")} />
      <div className="grid gap-[19px] lg:grid-cols-4 md:grid-cols-2 grid-cols-1">
        {financeItems.map((tag) => (
          <Tag type="finance" key={tag.text} item={tag} />
        ))}
      </div>
      <SellerFinanceManagement
        payments={payments.data}
        totalCount={payments.totalCount}
      />
    </>
  );
};
export default Page;

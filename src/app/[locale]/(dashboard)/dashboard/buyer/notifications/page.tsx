import HeaderDashboard from "@/components/common/dashboard/HeaderDashboard";
import BuyerNotifications from "@/components/pages/bd-notifications/container";
import { getAllNotifications } from "@/utils/service/notifications/get";
import { getTranslations } from "next-intl/server";

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{
    page: string;
    search: string;
    sort: string;
    order: string;
  }>;
}) => {
  const t = await getTranslations("Dashboard");
  const { page, sort, order } = await searchParams;
  const notifications = await getAllNotifications({
    page,
    sort,
    order,
    limit: "5",
  });

  return (
    <>
      <HeaderDashboard title={t("notifications")} />
      <BuyerNotifications
        notifications={notifications.data}
        totalCount={notifications.totalCount}
      />
    </>
  );
};
export default Page;

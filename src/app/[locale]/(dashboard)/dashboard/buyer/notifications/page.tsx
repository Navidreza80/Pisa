import BuyerNotifications from "@/components/pages/bd-notifications/container";
import { getAllNotifications } from "@/utils/service/notifications/get";

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
  const { page } = await searchParams;
  const notifications = await getAllNotifications({
    page,
    limit: "5",
  });

  return (
    <BuyerNotifications
      notifications={notifications.data}
      totalCount={notifications.totalCount}
    />
  );
};
export default Page;

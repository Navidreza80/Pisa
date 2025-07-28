import HeaderDashboard from "@/components/common/dashboard/HeaderDashboard";
import BuyerFavorites from "@/components/pages/bd-favorites/container";
import getAllFavorites from "@/utils/service/favorites/get";
import { getTranslations } from "next-intl/server";

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string; sort: string; order: string }>;
}) => {
  const t = await getTranslations("Dashboard");
  const { page, sort = "createdAt", order } = await searchParams;
  const favorites = await getAllFavorites({ page, limit: "5", sort, order });
  return (
    <>
      <HeaderDashboard title={t("favorites")} />
      <BuyerFavorites
        favorites={favorites.data}
        totalCount={favorites.totalCount}
      />
    </>
  );
};
export default Page;

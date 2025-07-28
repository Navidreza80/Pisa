import BuyerFavorites from "@/components/pages/bd-favorites/container";
import getAllFavorites from "@/utils/service/favorites/get";

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string; sort: string; order: string }>;
}) => {
  const { page, sort = "createdAt", order } = await searchParams;
  const favorites = await getAllFavorites({ page, limit: "5", sort, order });
  return (
    <BuyerFavorites
      favorites={favorites.data}
      totalCount={favorites.totalCount}
    />
  );
};
export default Page;

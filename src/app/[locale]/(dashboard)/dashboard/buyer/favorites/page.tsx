import BuyerFavorites from "@/components/pages/bd-favorites/container";
import getAllFavorites from "@/utils/service/favorites/get";

const Page = async () => {
  const favorites = await getAllFavorites();
  return <BuyerFavorites favorites={favorites.data} />;
};
export default Page;

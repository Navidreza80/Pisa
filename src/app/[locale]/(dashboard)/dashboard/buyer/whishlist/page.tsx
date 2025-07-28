import BuyerWishlists from "@/components/pages/bd-wishlist/container";
import { getAllWishlist } from "@/utils/service/whishlist/get";

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string; sort: string; order: string }>;
}) => {
  const { page, sort, order } = await searchParams;
  const wishlist = await getAllWishlist({ page, sort, order, limit: "5" });
  return (
    <BuyerWishlists
      wishlists={wishlist.data}
      totalCount={wishlist.totalCount}
    />
  );
};
export default Page;

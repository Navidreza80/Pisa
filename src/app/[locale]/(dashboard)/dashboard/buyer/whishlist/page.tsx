import BuyerWishlists from "@/components/pages/bd-wishlist/container";
import { getAllWishlist } from "@/utils/service/whishlist/get";

const Page = async () => {
  const wishlist = await getAllWishlist();
  return <BuyerWishlists wishlists={wishlist.data} />;
};
export default Page;

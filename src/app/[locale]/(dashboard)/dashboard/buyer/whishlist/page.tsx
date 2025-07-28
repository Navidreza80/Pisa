import HeaderDashboard from "@/components/common/dashboard/HeaderDashboard";
import BuyerWishlists from "@/components/pages/bd-wishlist/container";
import { getAllWishlist } from "@/utils/service/whishlist/get";

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string; sort: string; order: string }>;
}) => {
  // const t = await getTranslations("Dashboard");
  const { page, sort, order } = await searchParams;
  const wishlist = await getAllWishlist({ page, sort, order, limit: "5" });
  return (
    <>
      <HeaderDashboard title={"ذخیره شده ها"} />
      <BuyerWishlists
        wishlists={wishlist.data}
        totalCount={wishlist.totalCount}
      />
    </>
  );
};
export default Page;

/* eslint-disable */

import SellerDashboardProperties from "@/components/pages/sd-property-management/container";
import { getAllSellerHouses } from "@/utils/service/house/GetSellerHouses";

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
  const { page, search, sort, order } = await searchParams;
  const houses = await getAllSellerHouses({
    page,
    limit: "5",
    search,
    sort,
    order,
  });

  return (
    <SellerDashboardProperties
      houses={houses.houses}
      totalCount={houses.totalCount}
    />
  );
};
export default Page;

/* eslint-disable */

import SellerDashboardProperties from "@/components/pages/sd-property-management/container";
import { getAllSellerHouses } from "@/utils/service/house/GetSellerHouses";

const Page = async () => {
  const houses = await getAllSellerHouses();
  console.log(houses)

  return <SellerDashboardProperties houses={houses.houses} />;
};
export default Page;

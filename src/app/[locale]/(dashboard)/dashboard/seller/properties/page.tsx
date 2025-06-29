import SellerDashboardProperties from "@/components/pages/sd-property-management/container";
import { fetchHouses } from "@/utils/service/house/get";
import { getServerCookie } from "@/utils/service/storage/server-cookie";
import { jwtDecode } from "jwt-decode";

const Page = async () => {
  const token = await getServerCookie("serverAccessToken");
  const decoded = typeof token == "string" && jwtDecode(token);
  const houses = await fetchHouses({ limit: 100, page: 1 });
  const sellerHouses = houses.filter((el) => el.sellerId == decoded.id);

  return <SellerDashboardProperties houses={sellerHouses} />;
};
export default Page;

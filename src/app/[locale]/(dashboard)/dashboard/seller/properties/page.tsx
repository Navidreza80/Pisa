import HeaderDashboard from "@/components/common/dashboard/HeaderDashboard";
import SellerDashboardProperties from "@/components/pages/sd-property-management/container";
import { getAllSellerHouses } from "@/utils/service/house/GetSellerHouses";
import { getTranslations } from "next-intl/server";

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
  const t = await getTranslations("Dashboard");
  const { page, search, sort, order } = await searchParams;
  const houses = await getAllSellerHouses({
    page,
    limit: "5",
    search,
    sort,
    order,
  });

  return (
    <>
      <HeaderDashboard title={t("propertyManagement")} />
      <SellerDashboardProperties
        houses={houses.houses}
        totalCount={houses.totalCount}
      />
    </>
  );
};
export default Page;

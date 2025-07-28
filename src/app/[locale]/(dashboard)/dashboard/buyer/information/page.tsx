import HeaderDashboard from "@/components/common/dashboard/HeaderDashboard";
import BuyerInformation from "@/components/pages/bd-edit-profile/container";
import { getTranslations } from "next-intl/server";

const Page = async () => {
  const t = await getTranslations("Dashboard");
  return (
    <>
      <HeaderDashboard title={t("userInformation")} />
      <BuyerInformation />
    </>
  );
};
export default Page;

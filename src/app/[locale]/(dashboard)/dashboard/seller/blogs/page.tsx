import HeaderDashboard from "@/components/common/dashboard/HeaderDashboard";
import BlogsManagement from "@/components/pages/sd-blog-management/container";
import { getTranslations } from "next-intl/server";

const Page = async () => {
  const t = await getTranslations("Dashboard");

  return (
    <>
      <HeaderDashboard title={t("BlogsManagement")} />
      <BlogsManagement />
    </>
  );
};
export default Page;

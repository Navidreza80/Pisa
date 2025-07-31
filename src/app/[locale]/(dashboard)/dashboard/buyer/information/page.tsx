import { auth } from "@/auth";
import HeaderDashboard from "@/components/common/dashboard/HeaderDashboard";
import BuyerInformation from "@/components/pages/bd-edit-profile/container";
import { JwtPayload } from "@/types/user";
import { getServerCookie } from "@/utils/service/storage/server-cookie";
import { jwtDecode } from "jwt-decode";
import { getTranslations } from "next-intl/server";

const Page = async () => {
  const t = await getTranslations("Dashboard");
      const token = await getServerCookie("serverAccessToken");
    let decodedUser;
    if (token) {
      decodedUser =
        typeof token === "string" ? jwtDecode<JwtPayload>(token) : null;
    } else {
      decodedUser = await auth();
      decodedUser = decodedUser?.user;
    }
  return (
    <>
      <HeaderDashboard title={t("userInformation")} />
      <BuyerInformation decodedUser={decodedUser}/>
    </>
  );
};
export default Page;

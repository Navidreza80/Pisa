// Third party components
import { getServerCookie } from "@/utils/service/storage/server-cookie";
import { jwtDecode } from "jwt-decode";
import { getTranslations } from "next-intl/server";
import Button from "../button/button";
import LogoSVG from "../svg/logo";
import MobileNav from "./mobile-nav/mobile-nav";
import Navbar from "./navbar/navbar";
import UserProfile from "./user-profile/user-profile";

export default async function Header() {
  const t = await getTranslations("Header");
  const token = await getServerCookie("serverAccessToken");
  const decodedUser = typeof token == 'string' && jwtDecode(token);
  console.log(decodedUser)
  
  return (
    <div className="h-20 w-full py-6 flex items-center justify-between max-[600px]:h-28">
      {typeof token !== 'string' ? (
        <Button radius="sm" size="lg">
          {t("login")}
        </Button>
      ) : (
        <UserProfile user={{
          name: decodedUser?.name || undefined,
          email: decodedUser?.email || undefined,
          avatar: decodedUser?.profilePicture || undefined
        }} />
      )}
      <Navbar />
      <div className="flex justify-end items-center gap-x-3">
        <LogoSVG />
        <MobileNav />
      </div>
    </div>
  );
}

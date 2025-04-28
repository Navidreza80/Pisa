// Third party components
import { getServerCookie } from "@/utils/service/storage/server-cookie";
// JWT
import { jwtDecode } from "jwt-decode";
// Change lang
import { getTranslations } from "next-intl/server";
// Third party components
import Button from "../button/button";
import MobileNav from "./mobile-nav/mobile-nav";
import Navbar from "./navbar/navbar";
import UserProfile from "./user-profile/user-profile";
// SVGs
import LogoSVG from "../svg/logo";
// Types
import { JwtPayload } from "@/types/user";

export default async function Header() {
  // Hooks
  const t = await getTranslations("Header");
  const token = await getServerCookie("serverAccessToken");
  const decodedUser =
    typeof token === "string" ? jwtDecode<JwtPayload>(token) : null;

  return (
    <div className="h-20 w-full py-6 flex items-center justify-between max-[600px]:h-28">
      {!decodedUser ? (
        <Button radius="sm" size="lg">
          {t("login")}
        </Button>
      ) : (
        <UserProfile
          user={{
            name: decodedUser.name,
            email: decodedUser.email,
            profilePicture: decodedUser.profilePicture,
          }}
        />
      )}
      <Navbar />
      <div className="flex justify-end items-center gap-x-3">
        <LogoSVG />
        <MobileNav />
      </div>
    </div>
  );
}

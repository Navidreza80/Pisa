// Third party components
import { getServerCookie } from "@/utils/service/storage/server-cookie";

// JWT
import { jwtDecode } from "jwt-decode";

// Change lang
import { getTranslations } from "next-intl/server";

// Third party components
import Button from "../button/button";
import MobileNav from "./mobile-nav";
import Navbar from "./navbar";
import UserProfile from "./user-profile";

// SVGs
import LogoSVG from "../svg/logo";

// Types
import { JwtPayload } from "@/types/user";
import { TransitionLink } from "@/utils/helper/TransitionLink";
import Container from "../container/container";

/**
 * Heder component for page header.
 * 
 * @component
 * @returns {JSX.Element} - Rendered header
 */

export default async function Header() {
  // Hooks
  const t = await getTranslations("Header");
  const token = await getServerCookie("serverAccessToken");

  // Decoding user token and getting information logic
  const decodedUser =
    typeof token === "string" ? jwtDecode<JwtPayload>(token) : null;

  return (
    <Container>
      <div className="h-20 w-[85.5%] py-6 flex items-center justify-between max-[600px]:h-28">
        {!decodedUser ? (
          <Button radius="sm" size="lg">
            <TransitionLink href="/auth/login"> {t("login")}</TransitionLink>
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
          <LogoSVG size="w-[106px] h-[36px] md:w-[71px] md:h-[24px] lg:w-[71px] lg:h-[24px]" />
          <MobileNav />
        </div>
      </div>
    </Container>
  );
}

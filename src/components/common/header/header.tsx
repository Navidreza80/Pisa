// Third party components
import { getServerCookie } from "@/utils/service/storage/server-cookie";

// JWT
import { jwtDecode } from "jwt-decode";

// Change lang
import { getTranslations } from "next-intl/server";

// Third party components
import Button from "../button";
import MobileNav from "./mobile-nav";
import Navbar from "./navbar";
import UserProfile from "./user-profile";

// SVGs
import LogoSVG from "../svg/logo";

// Types
import { auth } from "@/auth";
import { JwtPayload } from "@/types/user";
import { TransitionLink } from "@/components/common/TransitionLink";
import Container from "../container";

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
  var decodedUser;
  if (token) {
    decodedUser =
      typeof token === "string" ? jwtDecode<JwtPayload>(token) : null;
  } else {
    decodedUser = await auth();
    decodedUser = decodedUser?.user
  }


  return (
    <Container>
      <div className="h-20 w-[85.5%] py-6 flex items-center justify-between max-[600px]:h-28">
        {!decodedUser ? (
          <TransitionLink href="/auth/login">
            <Button className="cursor-pointer" radius="sm" size="lg">
              {t("login")}
            </Button>
          </TransitionLink>
        ) : (
          <UserProfile
            user={{
              name: decodedUser.name,
              email: decodedUser.email,
              profilePicture: decodedUser.image,
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

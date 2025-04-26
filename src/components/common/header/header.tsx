// Third party components
import { getTranslations } from "next-intl/server";
import MobileNav from "./mobile-nav/mobile-nav";
import Navbar from "./navbar/navbar";
import LogoSVG from "../svg/logo";
import Button from "../button/button";

export default async function Header() {
  const t = await getTranslations("Header");
  return (
    <div className="h-20 w-full py-6 flex items-center justify-between max-[600px]:h-28">
      <Button radius="sm" size="lg" >
        {t("login")}
      </Button>
      <Navbar />
      <div className="flex justify-end items-center gap-x-3">
        <LogoSVG />
        <MobileNav />
      </div>
    </div>
  );
}

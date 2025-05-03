import BuildingsSvg from "@/components/svg/buildings";
import { ArrowLeft } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import hero from "../../../assets/images/landing/heroImage.png";
import Search from "./search";
import Button from "@/components/common/button/button";
import ArrowDownSVG from "@/components/common/svg/arrow-down";
import Scroll from "@/components/common/svg/scroll";

export default async function HeroSection() {
  const t = await getTranslations("HomePage");
  return (
    <div
      className="my-8 flex lg:justify-between md:justify-center justify-center relative"
    >
      <Search />
      <div className="w-[497px] h-[594px] relative md:hidden max-[1300px]:hidden lg:block sm:hidden animate-[var(--animation-fade-in-left)]">
        <Image
          src={hero}
          width={497}
          height={594}
          className="rounded-4xl"
          alt="hero image"
        />
        <div className="bg-white border border-border  absolute aspect-square w-[112px] top-20 rounded-full right-[-50px] flex flex-col items-center justify-around animate-[var(--animation-fade-in-up)] [animation-delay:0.2s]">
          <Scroll />
          <p className="mt-2 font-semibold text-sm text-black">{t("scroll")}</p>
          <ArrowDownSVG />
        </div>
      </div>
      <div className="flex justify-start items-end flex-wrap flex-col mt-7 animate-[var(--animation-fade-in-right)]">
        <h1 className="text-4xl font-bold lg:text-right md:text-center text-center animate-[var(--animation-fade-in-up)] [animation-delay:0.1s]">
          {t.rich("title", {
            br: () => <br />,
          })}
        </h1>
        <h2 className="lg:text-right lg:mx-0  md:mx-0 mx-auto md:text-center text-center text-base text-text-secondary  font-semibold mt-8 animate-[var(--animation-fade-in-up)] [animation-delay:0.2s]">
          {t.rich("subTitle", {
            br: () => <br />,
          })}
        </h2>
        <Button className="mt-8 lg:mx-0  md:mx-0 mx-auto group overflow-hidden gap-2 !w-auto text-base animate-[var(--animation-fade-in-up)] [animation-delay:0.3s]">
          <div className="relative right-0 group-hover:right-8 transition-all duration-100 ease-out opacity-100 group-hover:opacity-0">
            <ArrowLeft style={{ fontSize: "20px" }} />
          </div>
          {t("button")}
          <div className="relative group-hover:right-[151px] right-[-100px] transition-all ease-out duration-200 opacity-0 group-hover:opacity-100">
            <ArrowLeft style={{ fontSize: "20px" }} />
          </div>
        </Button>
        <BuildingsSvg width={350} height={350} />
      </div>
    </div>
  );
}

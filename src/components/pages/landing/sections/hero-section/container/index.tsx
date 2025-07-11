import Image from "next/image";
import Button from "@/components/common/button";
import BuildingsSvg from "@/components/svg/buildings";
import { ArrowLeft } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import hero from "@/assets/images/landing/heroImage.png";
import ScrollDown from "../content/Scroll";
import Search from "../content/Search";
import Reveal from "@/components/common/reveal";

export default async function HeroSection() {
  // Hooks
  const t = await getTranslations("HomePage");

  return (
    <div className="my-8 flex lg:justify-between md:justify-center justify-center relative">
      <Search />
      <div className="flex lg:justify-start md:justify-center justify-center items-start flex-wrap flex-col mt-7 animate-fade-left">
        <Reveal className="w-full">
          <h1 className="text-4xl w-full font-bold leading-[50px] ltr:lg: lg: md:text-center text-center">
            {t.rich("title", {
              br: () => <br />,
            })}
          </h1>
        </Reveal>
        <Reveal className="md:mx-0 mx-auto ">
          <h2 className="leading-[30px] ltr:lg: lg: md:text-center text-center text-base text-text-secondary  font-semibold mt-8">
            {t.rich("subTitle", {
              br: () => <br />,
            })}
          </h2>
        </Reveal>
        <Link href="/rent" className="lg:mx-0 ltr:hidden cursor-pointer md:mx-0 mx-auto">
          <Button className="mt-8 group relative z-30 overflow-hidden !w-auto gap-1 text-base pl-12">
            <div className="absolute left-4 group-hover:left-[-100px] transition-all duration-100 ease-out opacity-100 group-hover:opacity-0">
              <ArrowLeft style={{ fontSize: "20px" }} />
            </div>

            {t("button")}
            <div className="absolute group-hover:right-[133px] right-[-100px] transition-all ease-out duration-200 opacity-0 group-hover:opacity-100">
              <ArrowLeft style={{ fontSize: "20px" }} />
            </div>
          </Button>
        </Link>
        <BuildingsSvg width={350} height={350} />
      </div>
      <div className="w-[497px] h-[594px] relative md:hidden max-[1300px]:hidden lg:block sm:hidden animate-fade-right">
        <Image
          src={hero}
          width={497}
          height={594}
          className="rounded-4xl"
          alt="hero image"
        />
        <ScrollDown />
      </div>
    </div>
  );
}

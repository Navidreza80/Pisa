import HouseImage from "@/assets/images/landing/rank.jpg";
import Button from "@/components/common/button";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

const OurMissionSection = () => {
  // Hooks
  const t = useTranslations("AboutUs");
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mx-auto mb-16">
      <div className="relative">
        <div className="absolute -bottom-4 -right-4 w-full h-full bg-primary rounded-2xl"></div>
        <Image
          src={HouseImage.src}
          alt={t("nextElitesTeamAlt")}
          className="w-full h-auto object-cover rounded-2xl shadow-lg relative z-10"
          width={500}
          height={500}
        />
      </div>

      <div className="bg-surface p-8 rounded-2xl">
        <h2 className="text-2xl font-bold mb-6">{t("ourStory")}</h2>
        <p className="mb-6 leading-relaxed">
          {t.rich("storyDesc1", {
            span: (chunks) => (
              <span className="font-bold text-primary">{chunks}</span>
            ),
          })}
        </p>
        <p className="mb-6 leading-relaxed">{t("storyDesc2")}</p>
        <p className="mb-8 leading-relaxed">{t("storyDesc3")}</p>

        <div className="flex flex-wrap gap-4">
          <Link href="/contact">
            <Button>{t("contactUs")}</Button>
          </Link>
          <Link href="/">
            <Button variant="bordered"> {t("homePage")}</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default OurMissionSection;

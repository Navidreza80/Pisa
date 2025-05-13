// Third party components
import Button from "@/components/common/button";
// Change lang
import HouseCardList from "@/components/common/house/HouseCardList";
import Reveal from "@/components/common/reveal";
import { HouseItemsInterface } from "@/types/house";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export default async function TopSales({ data }) {
  const t = await getTranslations("HomePage");

  return (
    <div>
      <div className="flex justify-between items-center mb-[32px]">
        <Button>
          <Link href="/reserve">{t("seeMore")}</Link>
        </Button>
        <div className="flex flex-row-reverse gap-[20px]">
          <Reveal>
            <div className="font-bold text-right text-[28px]">
              {t.rich("hot", {
                br: () => <br />,
              })}
            </div>
          </Reveal>
        </div>
      </div>
      <div className="flex gap-[30px] justify-center md:justify-center lg:justify-between flex-wrap">
        {data.map((card: HouseItemsInterface, index: number) => (
          <HouseCardList
            key={index}
            showBathrooms
            showYard
            showRooms
            showParking
            card={card}
          />
        ))}
      </div>
      <div className="flex gap-[30px] justify-center md:justify-center lg:justify-between flex-wrap"></div>
    </div>
  );
}

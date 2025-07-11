import Button from "@/components/common/button";
import HouseCardList from "@/components/common/house/HouseCardList";
import Reveal from "@/components/common/reveal";
import { HouseItemsInterface } from "@/types/house";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

interface IProps {
  data: HouseItemsInterface[];
}

const Offers: React.FC<IProps> = async ({ data }) => {
  const t = await getTranslations("HomePage");

  return (
    <div>
      <div className="flex justify-between items-center mb-[32px]">
        <div className="flex flex-row-reverse gap-[20px]">
          <Reveal>
            <div className="font-bold  whitespace-nowrap md:text-[28px] text-2xl">
              {t("offer")}
            </div>
          </Reveal>
        </div>
        <Button>
          <Link href="/reserve">{t("seeMore")}</Link>
        </Button>
      </div>
      <div className="flex gap-[30px] justify-center md:justify-center lg:justify-between flex-wrap">
        {data.map((card: HouseItemsInterface, index: number) => (
          <HouseCardList
            key={index}
            discount
            showRooms
            showBathrooms
            showParking
            showCapacity
            card={card}
          />
        ))}
      </div>
    </div>
  );
};

export default Offers;

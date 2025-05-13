import Button from "@/components/common/button";
import HouseCardList from "@/components/common/house/HouseCardList";
import CountdownTimer from "@/components/common/CountdownTimer";
import { HouseItemsInterface } from "@/types/house";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import Reveal from "@/components/common/reveal";

async function Offers({ data }) {
  const t = await getTranslations("HomePage");

  // Set target date to 3 days from now
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 3);

  return (
    <div className="flex flex-wrap">
      <div className="flex w-full flex-wrap justify-between items-center mb-[32px]">
        <Button>
          <Link href="/rent">{t("seeMore")}</Link>
        </Button>
        <div className="flex flex-row-reverse gap-[20px]">
          <Reveal>
            <div className="font-bold text-[28px]">{t("offer")}</div>
          </Reveal>

          <div className="bg-[#FF5454] hidden lg:block md:block rounded-[16px] animate-wiggle-more">
            <p className="my-0 text-white text-[28px] p-[8px] text-center h-[52px] flex items-center font-bold">
              {t("spring")}
            </p>
          </div>
          <div className="hidden lg:block md:block">
            <CountdownTimer targetDate={targetDate} />
          </div>
        </div>
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
}

export default Offers;

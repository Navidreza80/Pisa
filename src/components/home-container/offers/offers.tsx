import Button from "@/components/common/button/button";
import HouseCardList from "@/components/common/house/HouseCardList";
import CountdownTimer from "@/components/common/timer/CountdownTimer";
import { HouseItemsInterface } from "@/types/house";
import { getTranslations } from "next-intl/server";

async function Offers({ data }) {
  const t = await getTranslations("HomePage");

  // Set target date to 3 days from now
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 3);

  return (
    <div>
      <div className="flex flex-wrap justify-between items-center mb-[32px]">
        <Button>{t("seeMore")}</Button>
        <div className="flex flex-row-reverse gap-[20px]">
          <div className="font-bold text-[28px]">{t("offer")}</div>
          <div
            className="bg-[#FF5454] hidden lg:block md:block rounded-[16px] [animation-timeline:view()] [animation-range:contain_0%_contain_50%]"
            style={{
              animation: "var(--animation-fall)",
              animationTimeline: "view()",
              animationRange: "contain 50% contain 100%",
            }}
          >
            <p className="my-0  text-white text-[28px] p-[8px] w-[74px] text-center h-[52px] flex items-center font-bold fallAnimation">
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

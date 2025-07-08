"use server";

import Reveal from "@/components/common/reveal";
import { HouseItemsInterface } from "@/types/house";
import Agent from "../content/Agent";
import Status from "../content/Status";

interface IProps {
  houseLength: number;
  houses: HouseItemsInterface[];
}

const PropertyAgentSection: React.FC<IProps> = async ({
  houseLength,
  houses,
}) => {
  return (
    <div dir="rtl">
      <Reveal>
        {/* Title */}
        <div className="text-right text-[28px] font-[700] mb-4">
          از هوش مصنوعی مشاوره بگیر!
        </div>
      </Reveal>
      <div className="flex grow flex-wrap justify-center md:justify-center lg:justify-between gap-6 mb-6">
        <Agent houses={houses} />
        <div className="gap-9 md:hidden hidden lg:flex">
          <div className="flex justify-end flex-col items-center">
            <div className="flex gap-9">
              <div className="flex flex-col items-center">
                <Status text={"خانه"} value={houseLength} />
                <div className="border h-2.5 border-primary w-[1px]"></div>
                <Status text={"شهر"} value={27} />
                <div className="border h-2.5 border-primary w-[1px]"></div>
                <Status text={"هتل"} value={82} />
              </div>
            </div>
          </div>
          <div className="w-[356px] h-[450px] rotate-y-180" />
        </div>
      </div>
    </div>
  );
};
export default PropertyAgentSection;

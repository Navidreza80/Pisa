"use client";

import {
    CorrectSVG,
    FacilitiesSVG,
    GallerySVG,
    InfoSVG,
    MapSVG,
} from "@/components/svg";
import { useAppSelector } from "@/utils/hooks/react-redux/store/hook";
import Line from "@/components/dashboard/buyer/line";

const Stepper = () => {
  const stepsItems = [
    { text: "مشخصات اولیه", id: 1 },
    { text: "آدرس ", id: 2 },
    { text: "امکانات", id: 3 },
    { text: "تصاویر تور", id: 4 },
    { text: "برنامه سفر", id: 5 },
  ];

  const id = useAppSelector((state) => state.tourSteps.id);

  return (
    <header className="w-full h-16 rounded-3xl bg-[#D9D9D9] dark:bg-surface flex flex-row-reverse items-center justify-between px-6">
      {stepsItems.map((item, index) => {
        return (
          <div className="flex items-center gap-[11px]" key={index}>
            {index != 4 && (
              <Line
                className={`w-[87px] ${item.id == id ? "!border-black" : id > item.id ? "!border-primary" : "!border-[#777777]"}`}
              />
            )}
            <h1
              className={`${item.id == id ? "text-black" : id > item.id ? "text-primary" : "text-[#777777]"}`}
            >
              {item.text}
            </h1>
            {index == 0 ? (
              <InfoSVG
                color={item.id == id ? "black" : id > item.id ? "#586cff" : ""}
              />
            ) : index == 1 ? (
              <MapSVG
                color={item.id == id ? "black" : id > item.id ? "#586cff" : ""}
              />
            ) : index == 2 ? (
              <FacilitiesSVG
                color={item.id == id ? "black" : id > item.id ? "#586cff" : ""}
              />
            ) : index == 3 ? (
              <GallerySVG
                color={item.id == id ? "black" : id > item.id ? "#586cff" : ""}
              />
            ) : (
              <CorrectSVG
                color={item.id == id ? "black" : id > item.id ? "#586cff" : ""}
              />
            )}
          </div>
        );
      })}
    </header>
  );
};
export default Stepper;

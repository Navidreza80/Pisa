"use client";

import {
  ApartmentSVG,
  MoneySVG,
  SearchSVG,
  TicketSVG,
  TravelersSVG
} from "@/components/svg";
import { useAppSelector } from "@/utils/hooks/react-redux/store/hook";
import { useEffect, useState } from "react";
import Line from "../../../common/dashboard/line";

const Stepper = () => {
  const stepsItems = [
    { text: "انتخاب هتل", id: 1 },
    { text: "مشخصات مسافران ", id: 2 },
    { text: "تایید اطلاعات", id: 3 },
    { text: "پرداخت انلاین", id: 4 },
    { text: "صدور بلیط", id: 5 },
  ];

  const id = useAppSelector((state) => state.bookingSteps.id);
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size on mount and when window resizes
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkScreenSize();

    // Add event listener for resize
    window.addEventListener("resize", checkScreenSize);

    // Clean up
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Mobile view - only show current step and adjacent steps
  const getVisibleSteps = () => {
    if (!isMobile) return stepsItems;

    // Find the indices of steps to show
    const currentIndex = stepsItems.findIndex((item) => item.id === id);
    const prevIndex = Math.max(0, currentIndex - 1);
    const nextIndex = Math.min(stepsItems.length - 1, currentIndex + 1);

    // Create a new array with only the steps to show
    return stepsItems.filter(
      (_, index) =>
        index === prevIndex || index === currentIndex || index === nextIndex
    );
  };

  const visibleSteps = getVisibleSteps();

  return (
    <header className="w-full h-16 md:h-16 rounded-3xl flex flex-row-reverse items-center justify-between overflow-x-auto">
      {visibleSteps.map((item, index, array) => {
        // For mobile view, we need to adjust the index for the icon selection
        const originalIndex = stepsItems.findIndex(
          (step) => step.id === item.id
        );
        const isLast = index === array.length - 1;

        return (
          <div
            className="flex items-center gap-1 md:gap-[11px] shrink-0"
            key={item.id}
          >
            {!isLast && (
              <Line
                className={`w-[30px] md:w-[120px] ${
                  item.id == id
                    ? "!border-black"
                    : id > item.id
                      ? "!border-primary"
                      : "!border-fade"
                }`}
              />
            )}
            <h1
              className={`text-xs md:text-base ${
                item.id == id
                  ? "text-black"
                  : id > item.id
                    ? "text-primary"
                    : "text-fade"
              }`}
            >
              {isMobile ? (item.id === id ? item.text : "") : item.text}
            </h1>
            <div className="flex-shrink-0">
              {originalIndex === 0 ? (
                <div
                  className={`rounded-full p-2 border-2 ${
                    item.id == id
                      ? "!border-black"
                      : id > item.id
                        ? "!border-primary"
                        : "!border-fade"
                  }`}
                >
                  <ApartmentSVG
                    color={
                      item.id == id ? "black" : id > item.id ? "#586cff" : ""
                    }
                  />
                </div>
              ) : originalIndex === 1 ? (
                <div
                  className={`rounded-full p-2 border-2 ${
                    item.id == id
                      ? "!border-black"
                      : id > item.id
                        ? "!border-primary"
                        : "!border-fade"
                  }`}
                >
                  <TravelersSVG
                    color={
                      item.id == id ? "black" : id > item.id ? "#586cff" : ""
                    }
                  />
                </div>
              ) : originalIndex === 2 ? (
                <div
                  className={`rounded-full p-2 border-2 ${
                    item.id == id
                      ? "!border-black"
                      : id > item.id
                        ? "!border-primary"
                        : "!border-fade"
                  }`}
                >
                  <SearchSVG
                    color={
                      item.id == id ? "black" : id > item.id ? "#586cff" : ""
                    }
                  />
                </div>
              ) : originalIndex === 3 ? (
                <div
                  className={`rounded-full p-2 border-2 ${
                    item.id == id
                      ? "!border-black"
                      : id > item.id
                        ? "!border-primary"
                        : "!border-fade"
                  }`}
                >
                  <MoneySVG
                    color={
                      item.id == id ? "black" : id > item.id ? "#586cff" : ""
                    }
                  />
                </div>
              ) : (
                <div
                  className={`rounded-full p-2 border-2 ${
                    item.id == id
                      ? "!border-black"
                      : id > item.id
                        ? "!border-primary"
                        : "!border-fade"
                  }`}
                >
                  <TicketSVG
                    color={
                      item.id == id ? "black" : id > item.id ? "#586cff" : ""
                    }
                  />
                </div>
              )}
            </div>
          </div>
        );
      })}
    </header>
  );
};
export default Stepper;

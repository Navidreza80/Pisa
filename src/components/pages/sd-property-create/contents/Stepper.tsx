"use client";

import {
    CorrectSVG,
    FacilitiesSVG,
    GallerySVG,
    InfoSVG,
    MapSVG,
} from "@/components/svg";
import { useAppSelector } from "@/utils/hooks/react-redux/store/hook";
import Line from "../../../common/dashboard/line";
import { useEffect, useState } from "react";

const Stepper = () => {
  const stepsItems = [
    { text: "مشخصات اولیه", id: 1 },
    { text: "آدرس ", id: 2 },
    { text: "امکانات", id: 3 },
    { text: "تصاویر ملک", id: 4 },
    { text: "تایید نهایی", id: 5 },
  ];

  const id = useAppSelector((state) => state.stepsId.id);
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size on mount and when window resizes
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkScreenSize();
    
    // Add event listener for resize
    window.addEventListener('resize', checkScreenSize);
    
    // Clean up
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Mobile view - only show current step and adjacent steps
  const getVisibleSteps = () => {
    if (!isMobile) return stepsItems;
    
    // Find the indices of steps to show
    const currentIndex = stepsItems.findIndex(item => item.id === id);
    const prevIndex = Math.max(0, currentIndex - 1);
    const nextIndex = Math.min(stepsItems.length - 1, currentIndex + 1);
    
    // Create a new array with only the steps to show
    return stepsItems.filter((_, index) => 
      index === prevIndex || index === currentIndex || index === nextIndex
    );
  };

  const visibleSteps = getVisibleSteps();

  return (
    <header className="w-full h-16 md:h-16 rounded-3xl bg-[#D9D9D9] dark:bg-surface flex flex-row-reverse items-center justify-between px-2 md:px-6 overflow-x-auto">
      {visibleSteps.map((item, index, array) => {
        // For mobile view, we need to adjust the index for the icon selection
        const originalIndex = stepsItems.findIndex(step => step.id === item.id);
        const isLast = index === array.length - 1;
        
        return (
          <div className="flex items-center gap-1 md:gap-[11px] shrink-0" key={item.id}>
            {!isLast && (
              <Line
                className={`w-[30px] md:w-[87px] ${
                  item.id == id 
                    ? "!border-black" 
                    : id > item.id 
                      ? "!border-primary" 
                      : "!border-[#777777]"
                }`}
              />
            )}
            <h1
              className={`text-xs md:text-base ${
                item.id == id 
                  ? "text-black" 
                  : id > item.id 
                    ? "text-primary" 
                    : "text-[#777777]"
              }`}
            >
              {isMobile ? (item.id === id ? item.text : "") : item.text}
            </h1>
            <div className="flex-shrink-0">
              {originalIndex === 0 ? (
                <InfoSVG
                  color={item.id == id ? "black" : id > item.id ? "#586cff" : ""}
                />
              ) : originalIndex === 1 ? (
                <MapSVG
                  color={item.id == id ? "black" : id > item.id ? "#586cff" : ""}
                />
              ) : originalIndex === 2 ? (
                <FacilitiesSVG
                  color={item.id == id ? "black" : id > item.id ? "#586cff" : ""}
                />
              ) : originalIndex === 3 ? (
                <GallerySVG
                  color={item.id == id ? "black" : id > item.id ? "#586cff" : ""}
                />
              ) : (
                <CorrectSVG
                  color={item.id == id ? "black" : id > item.id ? "#586cff" : ""}
                />
              )}
            </div>
          </div>
        );
      })}
    </header>
  );
};
export default Stepper;

import { ReactNode } from "react";
import { Swiper } from "swiper/types";

export interface SliderProps {
  children: ReactNode;
  className?: string;
  onSwiper?: (swiper: Swiper) => void;
  onSlideChange?: (swiper: Swiper) => void;
}

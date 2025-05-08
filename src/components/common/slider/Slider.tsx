"use client";
// React
import { FC } from "react";

// Dependencies
import { A11y, Autoplay, Pagination } from "swiper/modules";
import { Swiper as SwiperHolder } from "swiper/react";
import { SwiperOptions } from "swiper/types";

// Import Swiper styles
import { SliderProps } from "@/types/swiper";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import "./swiper-customize.css";

/**
 * Reusable slider component with customizable props.
 *
 * @component
 * @returns {JSX.Element} - Rendered slider
 */

const Slider: FC<Partial<SwiperOptions & SliderProps>> = (props) => {
  return (
    <SwiperHolder
      onSwiper={props.onSwiper}
      onSlideChange={props.onSlideChange}
      modules={[Autoplay, A11y]}
      {...props}
    >
      {props.children}
    </SwiperHolder>
  );
};

export default Slider;
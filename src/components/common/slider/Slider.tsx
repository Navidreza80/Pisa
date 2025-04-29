"use client";
import { FC } from "react";
import { A11y, Autoplay, Pagination } from "swiper/modules";
import { Swiper as SwiperHolder } from "swiper/react";
import { SwiperOptions } from "swiper/types";

// Import Swiper styles
import { SliderProps } from "@/types/swiper";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import "./SwiperCustomize.css";

const Slider: FC<Partial<SwiperOptions & SliderProps>> = (props) => {
  return (
    <SwiperHolder
      onSwiper={props.onSwiper}
      onSlideChange={props.onSlideChange}
      modules={[Pagination, Autoplay, A11y]}
      pagination={{ clickable: true }}
      {...props}
    >
      {props.children}
    </SwiperHolder>
  );
};

export default Slider;
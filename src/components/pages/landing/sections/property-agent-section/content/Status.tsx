"use client";

import { useInView } from "framer-motion";
import { useRef } from "react";
import CountUp from "react-countup";

interface IProps {
  value: number;
  text: string;
}

const Status: React.FC<IProps> = ({ value, text }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <div className="w-[129px] aspect-square border-border border rounded-3xl relative">
      <h2
        ref={ref}
        className="text-primary text-[32px] font-bold w-full text-center absolute top-[30px]"
      >
        +{isInView && <CountUp end={value} duration={2} />}
      </h2>
      <span className="w-full text-center text-base text-fade absolute top-[70px]">
        {text}
      </span>
    </div>
  );
};

export default Status;

"use client";

import ArrowDownSVG from "@/components/common/svg/arrow-down";
import Scroll from "@/components/common/svg/scroll";
import { useTranslations } from "next-intl";
import { motion, useAnimation } from "framer-motion";
import { useRef, useEffect } from "react";
import { useInView } from "framer-motion";

const ScrollDown = () => {
  // Hooks
  const t = useTranslations("HomePage");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px -20% 0px" });
  const controls = useAnimation();

  useEffect(() => {
    console.log("Is in view:", inView);
    controls.start({ opacity: inView ? 0 : 1, transition: { duration: 0.5 } });
  }, [inView, controls]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial={{ opacity: 1 }}
      className="bg-white border border-border absolute aspect-square w-[112px] top-20 rounded-full right-[-50px] flex flex-col items-center justify-around animate-jump-in"
    >
      <Scroll />
      <p className="mt-2 font-semibold text-sm text-black">{t("scroll")}</p>
      <ArrowDownSVG />
    </motion.div>
  );
};
export default ScrollDown;

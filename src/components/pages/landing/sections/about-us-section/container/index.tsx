"use client";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import AnimatedImage from "../content/AnimatedImage";
import Reveal from "@/components/common/reveal";
import RankSVG from "@/components/common/svg/Rank";

function Rank() {
  const t = useTranslations("HomePage");
  return (
    <div className="flex flex-row-reverse gap-4 lg:justify-between w-full">
      <div className="flex flex-col flex-wrap gap-[24px] lg:w-auto md:w-full w-full min-w-full">
        <div className="flex lg:justify-end md:justify-center justify-center">
          <RankSVG />
        </div>
        <div className="flex flex-col lg:justify-end md:justify-center justify-center flex-wrap gap-[24px]">
          <div className="flex lg:justify-end md:justify-center justify-center">
            <Reveal>
              <h1 className="text-text  w-[274px] lg:text-right md:text-center text-center font-[700] text-[28px]">
                {t.rich("rank", {
                  br: () => <br />,
                })}
              </h1>
            </Reveal>
          </div>
          <div className="lg:justify-end md:justify-center justify-center flex">
            <p className="max-w-[451px] lg:text-right md:text-center text-center text-[16px} text-[#2C2C2C] font-[700] text-text-secondary ">
              {t("rankDesc")
                .split(" ")
                .map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                    viewport={{ once: true }}
                  >
                    {word + " "}
                  </motion.span>
                ))}
            </p>
          </div>
        </div>
      </div>
      <div>
        <AnimatedImage />
      </div>
    </div>
  );
}

export default Rank;

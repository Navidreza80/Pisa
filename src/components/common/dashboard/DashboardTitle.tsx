"use client";

import LogoSVG from "@/components/common/svg/logo";
import { motion } from "framer-motion";

export default function DashboardTitle({ title }: { title: string }) {
  return (
    <div className="flex gap-2">
      <LogoSVG size="w-20 md:block block lg:hidden" />
      <h2 className={`text-xl md:hidden hidden lg:block font-bold my-auto`}>
        {title.split("").map((char, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </h2>
    </div>
  );
}

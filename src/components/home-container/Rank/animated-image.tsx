"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import rank from "@/assets/images/landing/rank.jpg"
export default function AnimatedImage() {
  return (
    <motion.div
      initial={{ scale: 0 }}
      whileInView={{ scale: 1.1 }}
      className=' w-[722px] h-[493px] md:hidden hidden lg:block rounded-[40px]'
    >
      <Image
        className="w-full h-full rounded-[40px]"
        src={rank}
        alt="Rank Icon"
      />
    </motion.div>
  );
}

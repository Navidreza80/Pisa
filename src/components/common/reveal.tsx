"use client";

import { JSX, useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

interface Props {
  children: JSX.Element;
  width?: "fit-content" | "100%";
  className?: string;
}

const Reveal = ({
  children,
  className,
  width = "fit-content",
  ...props
}: Props) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const mainControls = useAnimation();
  const slideControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
      slideControls.start("visible");
    }
  }, [isInView]);

  return (
    <div ref={ref} className={`${className}`} style={{ position: "relative", width, overflow: "hidden" }}>
      <motion.div
        {...props}
        className="text-right"
      >
        {children}
      </motion.div>
      <motion.div
        variants={{ hidden: { right: 0 }, visible: { right: "100%" } }}
        initial="hidden"
        animate={slideControls}
        transition={{ duration: 0.5, ease: "easeIn" }}
        className="absolute top-1 bottom-1 left-0 right-0 bg-background z-20"
      ></motion.div>
    </div>
  );
};
export default Reveal;

"use client";

import { Home } from "lucide-react";
import { motion } from "framer-motion";

export default function LoadingCustomized({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br">
      <div className="flex flex-col items-center space-y-4">
        <motion.div
          initial={{ scale: 0.8, rotate: 0 }}
          animate={{ scale: 1, rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut",
          }}
        >
          <Home className="w-16 h-16 text-blue-600 drop-shadow-md" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <p className="text-xl text-gray-700 font-medium" >{title}</p>
        </motion.div>
      </div>
    </div>
  );
}

"use client";

import { Blog } from "@/utils/service/blogs/GetBlogs";
import { motion } from "framer-motion";
import { CalendarDays, Clock3 } from "lucide-react";
import Link from "next/link";
import Tilt from "react-parallax-tilt";
import { useTranslations } from "next-intl";
import formatToPersianDate from "@/utils/helper/format-date";

interface BlogCardProps {
  blog: Blog;
  onClick?: () => void;
}

export default function BlogCard({ blog, onClick }: BlogCardProps) {
  const t = useTranslations("Blog");

  return (
    <Tilt
      options={{ max: 15, scale: 1.02 }}
      className="group w-[390px] bg-text-surface border border-border rounded-[40px] p-6 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col gap-4"
      >
        <h2 className="text-2xl font-extrabold text-text line-clamp-2 group-hover:text-primary transition">
          {blog.title}
        </h2>

        <p className="text-text-secondary text-sm leading-6 line-clamp-3">
          {blog.caption}
        </p>

        <div className="flex justify-between items-center text-xs text-fade mt-2">
          <div className="flex items-center gap-1">
            <Clock3 size={16} className="text-primary" />
            <span>{formatToPersianDate(blog.created_at)}</span>
          </div>
        </div>

        <Link key={blog.id} href={`/blogs/${blog.id}`} className="w-full">
          <button
            className="mt-6 w-full cursor-pointer text-sm font-semibold text-white bg-primary hover:bg-[#4853e3] px-5 py-2 rounded-xl transition"
            onClick={onClick}
          >
            {t("readArticle")}
          </button>
        </Link>
      </motion.div>
    </Tilt>
  );
}

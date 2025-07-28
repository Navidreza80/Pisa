"use client";

import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { CalendarDays, Clock3, Tag, User } from "lucide-react";
import { Blog } from "@/utils/service/blogs/GetBlogs";

interface BlogCardProps {
  blog: Blog;
  onClick?: () => void; 
}

export default function BlogCard({ blog, onClick }: BlogCardProps) {
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

        <div className="flex justify-between items-center text-sm text-text-secondary">
          <div className="flex items-center gap-1">
            <Tag size={16} className="text-fade" />
            <span>{blog.category_name || "بدون دسته"}</span>
          </div>
          <div className="flex items-center gap-1">
            <User size={16} className="text-fade" />
            <span>{blog.author_name || "ناشناس"}</span>
          </div>
        </div>

        <p className="text-text-secondary text-sm leading-6 line-clamp-3">
          {blog.caption}
        </p>

        <div className="flex justify-between items-center text-xs text-fade mt-2">
          <div className="flex items-center gap-1">
            <Clock3 size={16} className="text-primary" />
            <span>
              {Math.max(1, Math.ceil(blog.estimated_reading_time.seconds / 60))} دقیقه
            </span>
          </div>
          <div className="flex items-center gap-1">
            <CalendarDays size={16} className="text-primary" />
            <span>{new Date(blog.created_at).toLocaleDateString("fa-IR")}</span>
          </div>
        </div>

        <button
          className="mt-6 text-sm font-semibold text-white bg-primary hover:bg-[#4853e3] px-5 py-2 rounded-xl transition"
          onClick={onClick}
        >
          خواندن مقاله
        </button>
      </motion.div>
    </Tilt>
  );
}

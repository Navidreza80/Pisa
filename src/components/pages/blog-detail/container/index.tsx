"use client";

import Container from "@/components/common/container";
import { Calendar, UserRound, Tag, ChevronLeft, ChevronRight } from "lucide-react";
import BlogCard from "../components/BlogCard";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useRef } from "react";



interface Blog {
  id: string;
  title: string;
  caption: string;
  estimated_reading_time: { seconds: number };
  author_id: string;
  created_at: string;
  category_id: string;
}

interface Props {
  blog: Blog;
  relatedBlogs: Blog[];
}

export default function BlogDetailContainer({ blog, relatedBlogs }: Props) {
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  return (
    <Container>
      <div className="w-full lg:w-[85.5%] mx-auto flex flex-col gap-12 pt-10 pb-20">

        <div className="flex flex-col gap-4 border-b border-border pb-6">
          <h1 className="text-4xl font-extrabold text-text leading-snug">{blog.title}</h1>

          <div className="text-sm text-text-secondary flex flex-wrap gap-6">
            <span className="flex items-center gap-2">
              <UserRound className="w-4 h-4 text-fade" />
              <span>نویسنده: {blog.author_id}</span>
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-fade" />
              <span>{new Date(blog.created_at).toLocaleDateString("fa-IR")}</span>
            </span>
            <span className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-fade" />
              <span>دسته: {blog.category_id}</span>
            </span>
          </div>
        </div>

        <div className="prose prose-lg max-w-none text-text-secondary leading-8 tracking-wide">
          <p>{blog.caption}</p>
        </div>

        {relatedBlogs.length > 0 && (
          <div className="flex flex-col gap-6 pt-10 border-t border-border">
            <h2 className="text-2xl font-bold text-text">مقالات مرتبط</h2>

            <div className="">
              {relatedBlogs.length > 3 ? (
                <div className="relative w-full border-t border-border">
                  <button
                    ref={prevRef}
                    className="absolute z-10 top-1/2 -translate-y-1/2 right-0 bg-white dark:bg-dark border border-border shadow rounded-full p-2 text-text hover:bg-gray-100"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  <button
                    ref={nextRef}
                    className="absolute z-10 top-1/2 -translate-y-1/2 left-0 bg-background dark:bg-dark border border-border shadow rounded-full p-2 text-text hover:bg-text/80"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <Swiper
                    modules={[Navigation]}
                    spaceBetween={24}
                    slidesPerView={1.2}
                    onInit={(swiper) => {
                      if (prevRef.current && nextRef.current) {
                        swiper.params.navigation.prevEl = prevRef.current;
                        swiper.params.navigation.nextEl = nextRef.current;
                        swiper.navigation.init();
                        swiper.navigation.update();
                      }
                    }}
                    breakpoints={{
                      640: { slidesPerView: 1.2 },
                      768: { slidesPerView: 2 },
                      1024: { slidesPerView: 3 },
                    }}
                  >
                    {relatedBlogs.map((item) => (
                      <SwiperSlide key={item.id}>
                        <Link href={`/blogs/${item.id}`}>
                          <BlogCard blog={item} />
                        </Link>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {relatedBlogs.map((item) => (
                    <Link key={item.id} href={`/blogs/${item.id}`}>
                      <BlogCard blog={item} />
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Container>
  );
}

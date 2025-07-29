"use client";

import Container from "@/components/common/container";
import { Calendar, UserRound, Tag, ChevronLeft, ChevronRight } from "lucide-react";
import BlogCard from "../components/BlogCard";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import formatToPersianDate from "@/utils/helper/format-date";

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
  const t = useTranslations("Blog");
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  const [slidesPerView, setSlidesPerView] = useState(1);

  useEffect(() => {
    const updateSlidesPerView = () => {
      const width = window.innerWidth;
      if (width >= 1216) setSlidesPerView(2);
      else if (width >= 810) setSlidesPerView(1.5);
      else if (width >= 640) setSlidesPerView(1);
      else setSlidesPerView(1);
    };

    updateSlidesPerView(); // run on mount
    window.addEventListener("resize", updateSlidesPerView);
    return () => window.removeEventListener("resize", updateSlidesPerView);
  }, []);

  const shouldUseSlider = relatedBlogs.length > slidesPerView;

  return (
    <Container>
      <div className="w-full justify-center flex flex-col gap-10 pt-8 pb-16 px-4 sm:px-6">

        {/* Title & Meta */}
        <div className="flex xl:w-[85.5%] flex-col gap-4 border-b border-border pb-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-text leading-snug">{blog.title}</h1>

          <div className="text-sm text-text-secondary flex flex-wrap gap-4 sm:gap-6">
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-fade" />
              <span>{formatToPersianDate(blog.created_at)}</span>
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-lg xl:w-[85.5%] max-w-none text-text-secondary leading-8 tracking-wide">
          <p>{blog.caption}</p>
        </div>

        <span className="h-[1px] w-full bg-border" />

        {/* Related Blogs */}
        {relatedBlogs.length > 0 && (
          <div className="flex flex-col gap-6 pt-5">
            <h2 className="text-xl sm:text-2xl font-bold text-text">{t("relatedBlogs")}</h2>

            <div className={`w-full flex justify-center mx-auto`}>
              {shouldUseSlider ? (
                <div className={`relative w-full pt-6 !max-w-[${((slidesPerView) * 100) + "px"}]`}>
                  {/* Navigation Buttons */}
                  <button
                    ref={prevRef}
                    className="absolute z-10 top-1/2 -translate-y-1/2 right-2 sm:right-4 bg-white dark:bg-dark border border-border shadow rounded-full p-2 text-text hover:bg-gray-100"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  <button
                    ref={nextRef}
                    className="absolute z-10 top-1/2 -translate-y-1/2 left-2 sm:left-4 bg-background dark:bg-dark border border-border shadow rounded-full p-2 text-text hover:bg-text/80"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <Swiper
                    modules={[Navigation]}
                    spaceBetween={16}
                    slidesPerView={slidesPerView}
                    className=""
                    onInit={(swiper) => {
                      if (prevRef.current && nextRef.current) {
                        swiper.params.navigation.prevEl = prevRef.current;
                        swiper.params.navigation.nextEl = nextRef.current;
                        swiper.navigation.init();
                        swiper.navigation.update();
                      }
                    }}
                    breakpoints={{
                      640: { slidesPerView: 1 },
                      768: { slidesPerView: 2 },
                      1216: { slidesPerView: 3 },
                    }}
                  >
                    {relatedBlogs.map((item) => (
                      <SwiperSlide key={item.id}>
                        <BlogCard blog={item} />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 min-[1210px]:grid-cols-3">
                  {relatedBlogs.map((item) => (
                    <BlogCard blog={item} />
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

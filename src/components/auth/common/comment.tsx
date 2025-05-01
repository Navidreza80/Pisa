"use client";
// React hooks
import { useEffect, useRef, useState } from "react";
// Framer motion
import { motion, AnimatePresence } from "framer-motion";
// Slider
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
// Next Image
import Image from "next/image";
// Jalali to format date
import { format } from "date-fns-jalali";
// SVGs
import QuoteSVG from "@/components/common/svg/quote";
import Reload from "@/components/common/svg/reload";
import ToLeft from "@/components/common/svg/to-left";
import ToRight from "@/components/common/svg/to-right";
// API
import { getLandingComments } from "@/utils/service/comments/get";

interface Comment {
  created_at: string;
  caption: string;
  id: string;
}

export default function CommentsSwiper() {
  // Swiper hook
  const swiperRef = useRef<any>(null);
  // Comments state
  const [comments, setComments] = useState<Comment[] | unknown>([]);

  // Fetching comments
  const fetchComments = async () => {
    const response: Comment[] | unknown = await getLandingComments();
    setComments(response);
  };

  // UseEffects
  useEffect(() => {
    fetchComments();
  }, []);

  // Formatting date
  const formatDate = (dateString: string) => {
    if (!dateString) return "بدون تاریخ";

    try {
      const date = new Date(dateString);
      return format(date, "yyyy/M/d");
    } catch (e) {
      console.error("خطا در تبدیل تاریخ:", e);
      return dateString;
    }
  };

  // Navigation
  const handleNavigation = (direction: "prev" | "next") => {
    if (!swiperRef.current) return;
    if (direction === "prev") {
      swiperRef.current.slidePrev();
    } else {
      swiperRef.current.slideNext();
    }
  };

  const handleReload = () => {
    swiperRef.current?.slideTo(0);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 text-right">
      <div
        onMouseEnter={() => swiperRef.current?.autoplay?.stop()}
        onMouseLeave={() => swiperRef.current?.autoplay?.start()}
      >
        <Swiper
          modules={[Navigation, Autoplay]}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          spaceBetween={20}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          speed={800}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 1 },
          }}
          dir="rtl"
        >
          {typeof comments != 'undefined' && comments?.map((comment: Comment) => (
            <SwiperSlide key={comment.id}>
              <div className="w-[656px] h-[230px] bg-surface rounded-[24px] p-[24px] flex flex-col gap-[9px] overflow-hidden shadow-md">
                <div className="flex justify-end">
                  <QuoteSVG />
                </div>

                <div className="flex-grow">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={comment.id}
                      dir="rtl"
                      className="text-right text-text text-[16px] font-[600]"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.4 }}
                    >
                      {comment.caption || "متنی ثبت نشده"}
                    </motion.p>
                  </AnimatePresence>
                </div>

                <div className="flex justify-between items-end">
                  <div className="flex gap-x-[8px] items-center">
                    <Image
                      src="https://thumbs.dreamstime.com/b/male-default-avatar-profile-icon-man-face-silhouette-person-placeholder-vector-illustration-male-default-avatar-profile-icon-man-189495143.jpg"
                      alt="profile"
                      width={48}
                      height={48}
                      className="rounded-full border-black border-[1px]"
                    />
                    <div className="flex flex-col text-right">
                      <p className="font-[600] text-[16px] text-text">
                        کاربر ناشناس
                      </p>
                      <p
                        dir="rtl"
                        className="font-[500] font-yekannum text-[14px] text-text-secondary"
                      >
                        {formatDate(comment.created_at)}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-center gap-4 my-6">
                    <button onClick={() => handleNavigation("prev")}>
                      <ToRight />
                    </button>
                    <button onClick={() => handleNavigation("next")}>
                      <ToLeft />
                    </button>
                    <button onClick={handleReload}>
                      <Reload />
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

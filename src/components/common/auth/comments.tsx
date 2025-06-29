"use client";
// React & Next
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// Dependencies
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// SVGs
import QuoteSVG from "@/components/common/svg/quote";
import ToLeft from "@/components/common/svg/to-left";
import ToRight from "@/components/common/svg/to-right";

// Types
import type Comment from "@/types/auth";
import formatToPersianDate from "@/utils/helper/format-date";

export default function CommentsSwiper() {
  const SLIDE_DURATION = 5000;
  const swiperRef = useRef<any>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);
  const pausedProgress = useRef(0);
  const startTimeRef = useRef(Date.now());
  const remainingTimeRef = useRef(SLIDE_DURATION);
  const isHovered = useRef(false);


  useEffect(() => {
    async function fetchComments() {
      try {
        const response = await axios.get<{ data: Comment[] }>(
          "https://delta-project.liara.run/api/comments"
        );
        setComments(response.data.data);
      } catch (error: any) {
        console.error("Error fetching comments:", error);
        setError("مشکلی در دریافت کامنت‌ها پیش آمده است.");
      } finally {
        setLoading(false);
      }
    }
    fetchComments();
  }, []);

  const startTimer = (reset = true) => {
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
    }

    if (reset) {
      pausedProgress.current = 0;
      remainingTimeRef.current = SLIDE_DURATION;
      startTimeRef.current = Date.now();
    } else {
      startTimeRef.current = Date.now() - (pausedProgress.current / 100) * SLIDE_DURATION;
    }

    setProgress(pausedProgress.current);

    progressInterval.current = setInterval(() => {
      if (isHovered.current) {
        remainingTimeRef.current = SLIDE_DURATION - (Date.now() - startTimeRef.current);
        return;
      }

      const elapsed = Date.now() - startTimeRef.current;
      pausedProgress.current = (elapsed / SLIDE_DURATION) * 100;
      setProgress(Math.min(pausedProgress.current, 100));

      if (pausedProgress.current >= 100) {
        clearInterval(progressInterval.current!);
        if (swiperRef.current) {
          swiperRef.current.slideNext();
        }
      }
    }, 50);
  };

  const handleMouseEnter = () => {
    isHovered.current = true;
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
    }
    if (swiperRef.current) {
      swiperRef.current.autoplay.stop();
    }
  };

  const handleMouseLeave = () => {
    isHovered.current = false;
    if (swiperRef.current) {
      swiperRef.current.autoplay.start();
    }
    startTimer(false);
  };

  const handleNavigation = (direction: "prev" | "next") => {
    if (!swiperRef.current) return;
    if (direction === "prev") {
      swiperRef.current.slidePrev();
    } else {
      swiperRef.current.slideNext();
    }
    startTimer(true);
  };

  useEffect(() => {
    const onSlideChange = () => {
      startTimer(true);
    };

    const swiperInstance = swiperRef.current;
    if (swiperInstance) {
      swiperInstance.on('slideChange', onSlideChange);
    }

    return () => {
      if (swiperInstance) {
        swiperInstance.off('slideChange', onSlideChange);
      }
    };
  }, []);

  const radius = 15;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  if (loading) {
    return <div className="w-full max-w-4xl mx-auto px-4 text-center py-8">در حال بارگذاری...</div>;
  }

  if (error) {
    return <div className="w-full max-w-4xl mx-auto px-4 text-center py-8 text-red-500">{error}</div>;
  }

  if (comments.length === 0) {
    return <div className="w-full max-w-4xl mx-auto px-4 text-center py-8">نظری یافت نشد</div>;
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 text-right">
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Swiper
          modules={[Navigation, Autoplay]}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={() => startTimer()}
          spaceBetween={20}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: SLIDE_DURATION,
            disableOnInteraction: false,
          }}
          speed={800}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 1 },
          }}
          dir="rtl"
        >
          {comments.map((comment) => (
            <SwiperSlide key={comment.id}>
              <div className="w-[656px] h-[230px] bg-white rounded-[24px] p-[24px] flex flex-col gap-[9px] overflow-hidden shadow-md">
                <div className="flex justify-end">
                  <QuoteSVG />
                </div>

                <div className="flex-grow">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={comment.id}
                      dir="rtl"
                      className="text-right text-[#232323] text-[16px] font-[600]"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.4 }}
                    >
                      {comment.caption || "بدون توضیح"}
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
                      <p className="font-[600] text-[16px] text-[#232323]">
                        {comment.user?.name || "کاربر ناشناس"}
                      </p>
                      <p
                        dir="rtl"
                        className="font-[500]  text-[14px] text-[#5F5F5F]"
                      >
                        {formatToPersianDate(comment.created_at)}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-center gap-4">
                    <button className="my-auto" onClick={() => handleNavigation("prev")}>
                      <ToRight />
                    </button>
                    <button className="my-auto" onClick={() => handleNavigation("next")}>
                      <ToLeft />
                    </button>
                    <div dir="ltr" className="flex !justify-start items-center my-auto gap-6">
                      <div className="relative w-11 h-11">
                        <svg className="w-full h-full" viewBox="0 0 40 40">
                          <circle
                            cx="20"
                            cy="20"
                            r={radius}
                            fill="transparent"
                            stroke="#e5e7eb"
                            strokeWidth="3"
                          />
                          <circle
                            cx="20"
                            cy="20"
                            r={radius}
                            fill="transparent"
                            stroke="#586CFF"
                            strokeWidth="3"
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                            transform="rotate(-90 20 20)"
                          />
                        </svg>
                      </div>
                    </div>
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
"use client";
// React & Next
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// Dependencies
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
import formatToPersianDate from "@/utils/helper/format-date";
import { Swiper as SwiperType } from "swiper";

const comments = [
  {
    id: "1",
    createdAt: "2025-07-31T09:12:00Z",
    caption: "خیلی راحت تونستم خونه مورد نظرم رو پیدا کنم!",
    userName: "مهدی رضایی",
    profilePicture: "/images/sara.jpg",
  },
  {
    id: "2",
    createdAt: "2025-07-30T16:45:00Z",
    caption: "طراحی سایت عالیه و خیلی کاربرپسنده.",
    userName: "سارا احمدی",
    profilePicture: "/images/sara.jpg",
  },
  {
    id: "3",
    createdAt: "2025-07-29T13:20:00Z",
    caption: "رزرو هتل خیلی سریع انجام شد، ممنون از پلتفرم خوبتون.",
    userName: "علی کرمی",
    profilePicture: "/images/sara.jpg",
  },
  {
    id: "4",
    createdAt: "2025-07-28T10:05:00Z",
    caption: "فقط کاش گزینه‌های بیشتری برای فیلتر کردن بود.",
    userName: "نگار موسوی",
    profilePicture: "/images/sara.jpg",
  },
  {
    id: "5",
    createdAt: "2025-07-27T18:30:00Z",
    caption: "پشتیبانی خیلی سریع پاسخ داد، تجربه خوبی بود.",
    userName: "رضا عباسی",
    profilePicture: "/images/sara.jpg",
  },
];

export default function CommentsSwiper() {
  const t = useTranslations("Auth");
  const SLIDE_DURATION = 5000;
  const swiperRef = useRef<SwiperType | null>(null);
  const [progress, setProgress] = useState(0);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);
  const pausedProgress = useRef(0);
  const startTimeRef = useRef(Date.now());
  const remainingTimeRef = useRef(SLIDE_DURATION);
  const isHovered = useRef(false);

  const startTimer = (reset = true) => {
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
    }

    if (reset) {
      pausedProgress.current = 0;
      remainingTimeRef.current = SLIDE_DURATION;
      startTimeRef.current = Date.now();
    } else {
      startTimeRef.current =
        Date.now() - (pausedProgress.current / 100) * SLIDE_DURATION;
    }

    setProgress(pausedProgress.current);

    progressInterval.current = setInterval(() => {
      if (isHovered.current) {
        remainingTimeRef.current =
          SLIDE_DURATION - (Date.now() - startTimeRef.current);
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
      swiperInstance.on("slideChange", onSlideChange);
    }

    return () => {
      if (swiperInstance) {
        swiperInstance.off("slideChange", onSlideChange);
      }
    };
  }, []);

  const radius = 15;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;


  if (comments.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 w-[656px] h-[230px] bg-white rounded-[24px] p-[24px] flex flex-col gap-[9px] overflow-hidden shadow-md">
        <div className="w-full max-w-4xl mx-auto px-4 text-center py-8">
          {t("noComments")}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 ">
      <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
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
                      className=" text-[#232323] text-[16px] font-[600]"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.4 }}
                    >
                      {comment.caption || t("noDescription")}
                    </motion.p>
                  </AnimatePresence>
                </div>

                <div className="flex justify-between items-end">
                  <div className="flex gap-x-[8px] items-center">
                    <Image
                      src={comment.profilePicture}
                      width={48}
                      alt="User Profile"
                      height={48}
                      className="rounded-full w-12 h-12"
                    />
                    <div className="flex flex-col ">
                      <p className="font-[600] text-[16px] text-[#232323]">
                        {comment.userName || t("unknownUser")}
                      </p>
                      <p className="font-[500]  text-[14px] text-[#5F5F5F]">
                        {formatToPersianDate(comment.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-center gap-4">
                    <button
                      className="my-auto"
                      onClick={() => handleNavigation("prev")}
                    >
                      <span className="sr-only">{t("prev")}</span>
                      <ToRight />
                    </button>
                    <button
                      className="my-auto"
                      onClick={() => handleNavigation("next")}
                    >
                      <span className="sr-only">{t("next")}</span>
                      <ToLeft />
                    </button>
                    <div className="flex !justify-start items-center my-auto gap-6">
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

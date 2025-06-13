"use client";
import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import ToRight from "@/components/common/svg/to-right";
import ToLeft from "@/components/common/svg/to-left";
import Image from "next/image";
import { useTranslations } from "next-intl";
import formatToPersianDate from "@/utils/helper/format-date";

const Comments = () => {
  const comments = [
    {
      id: 1,
      content:
        "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد",
      author: "پارسا آقایی",
      date: "2025-02-23T13:25:17.053Z",
    },
    {
      id: 2,
      content: "چرت و مزخرف.هر کی میگه خوبه فامیل صاحب شرکته",
      author: "علی محمدی",
      date: "2025-02-23T13:25:17.053Z",
    },
    {
      id: 3,
      content:
        "خیلی خیل خیلی خیلی خیلی خیلی خیلی خیلیییییییییییییییییییییی عالی",
      author: "مریم حسینی",
      date: "2025-02-23T13:25:17.053Z",
    },
    {
      id: 4,
      content: "بی نظییرههه به به",
      author: "رضا کریمی",
      date: "2025-02-23T13:25:17.053Z",
    },
    {
      id: 5,
      content: "بیست ملیارد تو امریکاخونه خریدم ازینجا توی کابل بهم خونه دادن",
      author: "قلی خان",
      date: "2025-02-23T13:25:17.053Z",
    },
    {
      id: 6,
      content: "بد نیست",
      author: "اکبر حسین زاده",
      date: "2025-02-23T13:25:17.053Z",
    },
  ];

  const [progress, setProgress] = useState(0);
  const progressInterval = useRef(null);
  const swiperRef = useRef<any>(null);
  const SLIDE_DURATION = 5000;
  const t = useTranslations("HomePage");

  const startTimer = () => {
    clearInterval(progressInterval.current);
    setProgress(0);

    let startTime = Date.now();
    progressInterval.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = (elapsed / SLIDE_DURATION) * 100;
      setProgress(Math.min(newProgress, 100));
    }, 50);
  };

  useEffect(() => {
    startTimer();
    return () => clearInterval(progressInterval.current);
  }, []);

  const radius = 15;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const handleNavigation = (direction: "prev" | "next") => {
    if (!swiperRef.current) return;
    if (direction === "prev") {
      swiperRef.current.slidePrev();
    } else {
      swiperRef.current.slideNext();
    }
  };

  return (
    <div className="lg:max-w-[1300px] md:max-w-[700px] max-w-[420px] rounded-4xl mx-auto px-4 py-8 relative">
      <h2 className="text-[28px] font-bold mb-8">{t("CommentsPiza")}</h2>

      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={30}
        slidesPerView={3}
        autoplay={{
          delay: SLIDE_DURATION,
          disableOnInteraction: false,
        }}
        loop={true}
        navigation={{
          prevEl: ".swiper-button-prev",
          nextEl: ".swiper-button-next",
        }}
        onSlideChange={() => startTimer()}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        className="pb-12"
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
      >
        {comments.map((comment) => (
          <SwiperSlide key={comment.id}>
            <div className="bg-[#586CFF] flex flex-col flex-wrap justify-between p-6 rounded-[32px] shadow-md border border-gray-100 h-[426px] w-[385px]">
              <p className="text-white text-[16px] font-[500] mb-4">
                {comment.content}
              </p>
              <div className="flex justify-end gap-[8px] ">
                <div className="flex flex-col flex-wrap">
                  <span className="text-[16px] font-semibold text-white">
                    {comment.author}
                  </span>
                  <span dir="rtl" className="text-[14px] font-[500] text-[#E5E5E5]">
                    {formatToPersianDate(comment.date)}
                  </span>
                </div>
                <Image
                  width={48}
                  height={48}
                  className="rounded-full"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQflP_6B6B0zYzZqpsQTXbBKAflqqVPvX2nsg&s"
                  alt="profile"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div dir="ltr" className="flex !justify-start items-center mt-8 gap-6">
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
        <button onClick={() => handleNavigation("prev")}>
          <ToLeft />
        </button>
        <button onClick={() => handleNavigation("next")}>
          <ToRight />
        </button>
      </div>
    </div>
  );
};

export default Comments;

'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { useRef, useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';

const testimonials = [
  {
    name: "پارسا آقایی",
    date: "۱۳ مرداد ۱۴۰۳",
    text: `لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است.`,
    avatar: "https://ui-avatars.com/api/?name=Parsa+Aghaei&background=0D8ABC&color=fff",
  },
  {
    name: "رضا محمدی",
    date: "۱۲ مرداد ۱۴۰۳",
    text: `لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. بسیاری از طراحان گرافیک برای ارایه طرح نهایی.`,
    avatar: "https://ui-avatars.com/api/?name=Reza+Mohammadi&background=0D8ABC&color=fff",
  },
  {
    name: "نگار رحیمی",
    date: "۱۳ مرداد ۱۴۰۳",
    text: `لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. نرم‌افزارهای طراحی اساسا با هدف بهبود ابزارهای کاربردی.`,
    avatar: "https://ui-avatars.com/api/?name=Negar+Rahimi&background=0D8ABC&color=fff",
  },
  {
    name: "نگار رحیمی",
    date: "۱۳ مرداد ۱۴۰۳",
    text: `لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. نرم‌افزارهای طراحی اساسا با هدف بهبود ابزارهای کاربردی.`,
    avatar: "https://ui-avatars.com/api/?name=Negar+Rahimi&background=0D8ABC&color=fff",
  },
];

export default function TestimonialsCarousel() {
  const swiperRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleNavigation = (direction) => {
    setLoading(true);
    if (direction === 'prev') {
      swiperRef.current?.slidePrev();
    } else {
      swiperRef.current?.slideNext();
    }
    setTimeout(() => setLoading(false), 500); // وقتی اسلاید عوض شد لودینگ خاموش بشه
  };


  return (
    <div className="w-full max-w-6xl mx-auto px-4 text-right">
      <h2 className="text-xl font-bold mb-6">نظرات کاربران پیزا</h2>

      <Swiper
  modules={[Navigation]}
  onSwiper={(swiper) => (swiperRef.current = swiper)}
  spaceBetween={20}
  slidesPerView={1}
  loop={true}
  breakpoints={{
    768: { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
  }}
  dir="rtl"
>
        {testimonials.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="bg-blue-500 text-white rounded-2xl p-6 h-[426px] flex flex-col justify-between relative shadow-md">
              <p className="text-sm leading-relaxed mb-4">{item.text}</p>
              <div className="flex flex-col items-start text-xs mt-4 ms-12">
  <span className="font-semibold">{item.name}</span>
  <span className="text-gray-200 text-[10px] mt-1">{item.date}</span>
</div>
              <div className="absolute bottom-4 right-4 w-8 h-8 rounded-full overflow-hidden bg-white border-2 border-white shadow-md">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="flex justify-start items-center mt-6 gap-4">
        {/* لودینگ سمت چپ دکمه چپ */}
        <div className="w-5 h-5 flex items-center justify-center">
        {loading && (
          <span className="inline-block w-5 h-5 border-4 border-gray-400 border-t-transparent rounded-full animate-spininline-block w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></span>
        )}
         </div>
        <button
          onClick={() => handleNavigation('prev')}
          className="text-black text-[40px] hover:scale-110 transition"
        >
          ←
        </button>
        <button
          onClick={() => handleNavigation('next')}
          className="text-black  text-[40px] hover:scale-110 transition"
        >
          →
        </button>
      </div>
    </div>
  );
}

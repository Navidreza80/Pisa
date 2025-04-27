'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import 'swiper/css';
import 'swiper/css/navigation';

// تعریف تایپ نظرات
interface Testimonial {
  id: string;
  house_id: string | null;
  user_id: string | null;
  title: string | null;
  caption: string | null;
  rating: string | null;
  created_at: string;
  parent_comment_id: string | null;
}

export default function TestimonialsCarousel() {
  const swiperRef = useRef<any>(null); // بهتره بعداً دقیق‌تر typing بشه
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [navigating, setNavigating] = useState<boolean>(false);

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const response = await axios.get<Testimonial[]>('https://delta-project.liara.run/api/comments');
        setTestimonials(response.data);
      } catch (error) {
        console.error('خطا در دریافت نظرات:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchTestimonials();
  }, []);

  const handleNavigation = (direction: 'prev' | 'next') => {
    setNavigating(true);
    if (direction === 'prev') {
      swiperRef.current?.slidePrev();
    } else {
      swiperRef.current?.slideNext();
    }
    setTimeout(() => setNavigating(false), 500); // بعد از 500 میلی‌ثانیه، لودینگ خاموش می‌شود
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 text-right">
      <h2 className="text-xl font-bold mb-6">نظرات کاربران</h2>

      {loading && (
        <div className="w-full flex justify-center items-center py-10">
          <span className="inline-block w-8 h-8 border-4 border-gray-400 border-t-transparent rounded-full animate-spin"></span>
        </div>
      )}

      {!loading && (
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
          {testimonials.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="bg-blue-500 text-white rounded-2xl p-6 h-[426px] flex flex-col justify-between relative shadow-md">
                <p className="text-sm leading-relaxed mb-4">
                  {item.caption && item.caption.trim() !== '' ? item.caption : 'بدون متن'}
                </p>
                <div className="flex flex-col items-start text-xs mt-4 ms-12">
                  <span className="font-semibold">
                    {item.title && item.title.trim() !== '' ? item.title : 'کاربر ناشناس'}
                  </span>
                  <span className="text-gray-200 text-[10px] mt-1">
                    {new Date(item.created_at).toLocaleDateString('fa-IR')}
                  </span>
                </div>
                <div className="absolute bottom-4 right-4 w-8 h-8 rounded-full overflow-hidden bg-white border-2 border-white shadow-md">
                  <img
                    src="https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff"
                    alt="avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      <div className="flex justify-start items-center mt-6 gap-4">
        <div className="w-5 h-5 flex items-center justify-center">
          {navigating && (
            <span className="inline-block w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></span>
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
          className="text-black text-[40px] hover:scale-110 transition"
        >
          →
        </button>
      </div>
    </div>
  );
}

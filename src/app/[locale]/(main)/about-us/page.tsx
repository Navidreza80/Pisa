"use client";

import elmira from "@/assets/images/about-us/elmira.jpg";
import navid from "@/assets/images/about-us/navid.jpg";
import taha from "@/assets/images/about-us/taha.jpg";
import nextElites from "@/assets/images/landing/rank.png";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import Features from "./Items/Features";
import Mentor from "./Items/Mentor";
import ProfileNextElites from "./Items/ProfileNextElites";

export default function AboutUs() {
  useEffect(() => {
    const map = L.map("map").setView([36.67809, 53.058983], 15);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    L.marker([60.5658, 53.0588])
      .addTo(map)
      .bindPopup(" آکادمی سپهر")
      .openPopup();

    return () => {
      map.remove();
    };
  }, []);
  return (
    <main className="min-h-screen py-[20px] px-4">
      <div className="container mx-auto">
        <div className="mb-20 max-w-6xl mx-auto">
          <Mentor />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ProfileNextElites
              name="Navid Abbaszadeh"
              job="Frontend Developer"
              profile={navid.src}
            />
            <ProfileNextElites
              name="Taha Talebi "
              job="Frontend Developer"
              profile={taha.src}
            />
            <ProfileNextElites
              name="Elmira Shirkhani"
              job="Frontend Developer"
              profile={elmira.src}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto mb-16">
          <div className="relative">
            <div className="absolute -bottom-4 -right-4 w-full h-full bg-blue-600 rounded-2xl"></div>
            <img
              src={nextElites.src}
              alt="Next Elites Team"
              className="w-full h-auto object-cover rounded-2xl shadow-lg relative z-10"
            />
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">داستان ما</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              به <span className="font-bold text-blue-600">Next Elites</span>{" "}
              خوش آمدید! ما یک تیم متخصص در توسعه وب هستیم که با استفاده از
              فناوری‌های پیشرفته، راه‌حل‌های نوآورانه در زمینه املاک ارائه
              می‌دهیم.
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed">
              ما به ساخت تجربه‌های مدرن، مقیاس‌پذیر و کاربرپسند وب متعهد هستیم.
              تیم ما همواره در تلاش برای ارائه نوآوری و کیفیت در هر پروژه است.
            </p>
            <p className="text-gray-700 mb-8 leading-relaxed">
              در زمینه املاک، ما پلتفرمی ایجاد کرده‌ایم که خرید، فروش و اجاره
              ملک را برای مشتریان آسان‌تر می‌کند. با استفاده از فناوری‌های
              پیشرفته، ما امکان جستجوی هوشمند، مشاهده تصاویر با کیفیت بالا و
              ارتباط مستقیم با مشاوران املاک را فراهم می‌کنیم.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="/contact"
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition shadow-md"
              >
                تماس با ما
              </a>
              <a
                href="/"
                className="px-6 py-3 border border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition"
              >
                صفحه اصلی
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 bg-white p-8 rounded-2xl shadow-lg max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            خدمات املاک ما
          </h2>
          <p className="text-gray-700 mb-6 leading-relaxed">
            در Next Elites، ما مجموعه‌ای از خدمات املاک را ارائه می‌دهیم که به
            مشتریان کمک می‌کند تا بهترین انتخاب را برای سرمایه‌گذاری، خرید یا
            اجاره ملک داشته باشند. تیم ما با تجربه و دانش گسترده در بازار املاک،
            راهنمایی‌های ارزشمندی را به مشتریان ارائه می‌دهد.
          </p>
          <p className="text-gray-700 mb-6 leading-relaxed">
            پلتفرم ما امکان جستجوی پیشرفته بر اساس موقعیت، قیمت، متراژ و سایر
            ویژگی‌ها را فراهم می‌کند. همچنین، با استفاده از هوش مصنوعی،
            پیشنهادهای شخصی‌سازی شده برای هر کاربر ارائه می‌دهیم که متناسب با
            نیازها و ترجیحات آن‌ها است.
          </p>
          <p className="text-gray-700 mb-6 leading-relaxed">
            ما همچنین خدمات مشاوره حقوقی در زمینه معاملات املاک، ارزیابی ملک، و
            مدیریت اجاره را ارائه می‌دهیم. هدف ما ایجاد یک تجربه بدون دردسر و
            شفاف برای تمام مشتریان است.
          </p>
        </div>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Features
            title="کیفیت"
            desc="ما به ارائه محصولات با کیفیت بالا و بدون نقص متعهد هستیم"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            }
          />

          <Features
            title="نوآوری"
            desc="همیشه به دنبال راه‌های جدید و خلاقانه برای حل مشکلات هستیم"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            }
          />

          <Features
            title="همکاری"
            desc="با مشتریان و مشاوران املاک خود همکاری نزدیک داریم تا بهترین نتایج را به دست آوریم"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            }
          />
        </div>

        <div className="mt-24 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            موقعیت ما
          </h2>
          <div className="bg-white p-4 rounded-xl shadow-lg">
            <div className="h-96 bg-gray-200 rounded-lg">
              <div id="map" className="w-full h-full rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

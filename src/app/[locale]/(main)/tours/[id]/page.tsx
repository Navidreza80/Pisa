"use client";

import MapSVG from "@/components/common/svg/map";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, MapPin, Stars } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

function Page() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <div
        dir="rtl"
        className="px-4 sm:px-6 md:px-12 lg:px-24 pt-6 sm:pt-10 md:pt-12  transition-colors duration-200 relative overflow-hidden"
      >
        <div className="flex flex-col lg:flex-row-reverse lg:justify-between w-full gap-8">
          <div className="mt-10 max-[1027px]:mt-0 w-[58%] max-[1027px]:w-full">
            <div className="max-[1027px]:block hidden">
              <h1 className="text-[32px] font-bold text-text-secondary">
                تور گردشگری سالار دره
              </h1>
              <div className="flex gap-2 mt-2 mb-[47px] items-center">
                <MapSVG color="#7e7e7e" />
                <h1 className="text-[14px] font-medium text-text-secondary">
                  ساری, سالار دره
                </h1>
              </div>
            </div>
            <Tabs defaultValue="map" dir="rtl" className="w-full">
              <TabsList className="w-full flex justify-between mb-6 bg-transparent p-0 h-auto">
                <TabsTrigger
                  value="itinerary"
                  className="flex-1 py-3 rounded-t-lg border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 dark:data-[state=active]:border-blue-400 bg-transparent"
                >
                  <Calendar className="w-5 h-5 ml-2" />
                  برنامه سفر
                </TabsTrigger>
                <TabsTrigger
                  value="map"
                  className="flex-1 py-3 rounded-t-lg border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 dark:data-[state=active]:border-blue-400 bg-transparent"
                >
                  <MapPin className="w-5 h-5 ml-2" />
                  نقشه سفر
                </TabsTrigger>
                <TabsTrigger
                  value="Advantages"
                  className="flex-1 py-3 rounded-t-lg border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 dark:data-[state=active]:border-blue-400 bg-transparent"
                >
                  <Stars className="w-5 h-5 ml-2" />
                  مزایای تور
                </TabsTrigger>
              </TabsList>

              <TabsContent value="itinerary" className="mt-2">
                <div className="space-y-6">
                  <h3 className="text-lg font-bold">برنامه روزانه سفر</h3>
                  <div className="border border-border rounded-xl p-4 sm:p-5">
                    <div className="flex items-center mb-3">
                      <div className="p-2 rounded-lg ml-3">
                        <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <h4 className="text-lg font-bold text-text">
                        روز اول: ورود به استانبول
                      </h4>
                    </div>
                    <div className="space-y-3 mr-12 border-r border-dashed border-border pr-5">
                      <div className="relative">
                        <div className="absolute right-[-29px] top-1 w-4 h-4 rounded-full bg-blue-600 dark:bg-blue-500"></div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 text-shadow-text-secondary ml-2" />
                          <span className="text-sm text-shadow-text-secondary">
                            08:00
                          </span>
                          <span className="mx-2 text-shadow-text-secondary">
                            -
                          </span>
                          <p className="text-text">
                            ورود به فرودگاه استانبول و انتقال به هتل
                          </p>
                        </div>
                      </div>
                      <div className="relative">
                        <div className="absolute right-[-29px] top-1 w-4 h-4 rounded-full bg-blue-600 dark:bg-blue-500"></div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 text-shadow-text-secondary ml-2" />
                          <span className="text-sm text-shadow-text-secondary">
                            12:00
                          </span>
                          <span className="mx-2 text-shadow-text-secondary">
                            -
                          </span>
                          <p className="text-text">
                            استراحت و صرف ناهار در رستوران سنتی
                          </p>
                        </div>
                      </div>
                      <div className="relative">
                        <div className="absolute right-[-29px] top-1 w-4 h-4 rounded-full bg-blue-600 dark:bg-blue-500"></div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 text-shadow-text-secondary ml-2" />
                          <span className="text-sm text-shadow-text-secondary">
                            16:00
                          </span>
                          <span className="mx-2 text-shadow-text-secondary">
                            -
                          </span>
                          <p className="text-text">
                            بازدید از میدان تقسیم و خیابان استقلال
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="border border-border rounded-xl p-4 sm:p-5">
                    <div className="flex items-center mb-3">
                      <div className="p-2 rounded-lg ml-3">
                        <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <h4 className="text-lg font-bold text-text">
                        روز دوم: بازدید از آثار تاریخی
                      </h4>
                    </div>
                    <div className="space-y-3 mr-12 border-r border-dashed border-border pr-5">
                      <div className="relative">
                        <div className="absolute right-[-29px] top-1 w-4 h-4 rounded-full bg-blue-600 dark:bg-blue-500"></div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 text-shadow-text-secondary ml-2" />
                          <span className="text-sm text-shadow-text-secondary">
                            09:00
                          </span>
                          <span className="mx-2 text-shadow-text-secondary">
                            -
                          </span>
                          <p className="text-text">
                            بازدید از مسجد آبی و ایاصوفیه
                          </p>
                        </div>
                      </div>
                      <div className="relative">
                        <div className="absolute right-[-29px] top-1 w-4 h-4 rounded-full bg-blue-600 dark:bg-blue-500"></div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 text-shadow-text-secondary ml-2" />
                          <span className="text-sm text-shadow-text-secondary">
                            13:00
                          </span>
                          <span className="mx-2 text-shadow-text-secondary">
                            -
                          </span>
                          <p className="text-text">
                            صرف ناهار در رستوران با منظره بسفر
                          </p>
                        </div>
                      </div>
                      <div className="relative">
                        <div className="absolute right-[-29px] top-1 w-4 h-4 rounded-full bg-blue-600 dark:bg-blue-500"></div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 text-shadow-text-secondary  ml-2" />
                          <span className="text-sm text-shadow-text-secondary">
                            15:00
                          </span>
                          <span className="mx-2 text-shadow-text-secondary">
                            -
                          </span>
                          <p className="text-text">بازدید از کاخ توپکاپی</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="map" className="mt-2">
                <Image
                  className="w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] rounded-2xl border border-gray-200 dark:border-gray-700 object-cover"
                  width={632}
                  height={400}
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAiymgCZXN4YHk75o1IY-MLXLb8cLSRVrSUQ&s"
                  alt="تور گردشگری سالار دره"
                />
                <h1 className="mt-6 text-base text-text leading-relaxed">
                  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و
                  با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و
                  مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی
                  تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای
                  کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و
                  آینده، شناخت فراوان جامعه و متخصصان را می طلبد.
                </h1>

                <div className="border mt-10 border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-800/60">
                  <div className="bg-red-500 h-100"> </div>
                </div>
              </TabsContent>

              <TabsContent value="Advantages" className="mt-2">
                <div className=" rounded-2xl overflow-hidden border border-border shadow-sm">
                  <div className="relative">
                    <div className="pt-6 pb-4 px-6 border-b border-border">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                        <div>
                          <span className="inline-block px-3 py-1 rounded-md text-blue-600 dark:text-blue-300 text-sm font-medium mb-2">
                            تور ویژه تابستانه
                          </span>
                          <h2 className="text-xl sm:text-2xl font-bold text-shadow-text mb-1">
                            مزایای اختصاصی تور استانبول
                          </h2>
                          <p className="text-shadow-text-secondary text-sm">
                            تجربه‌ای منحصر به فرد در قلب ترکیه
                          </p>
                        </div>
                        <div className="mt-4 md:mt-0">
                          <div className="flex items-center justify-center w-12 h-12 bg-background rounded-full">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6 text-blue-600 dark:text-blue-300"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 sm:p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                        <div className="border border-border p-4 sm:p-5 rounded-xl  transition-colors duration-300 bg-surface">
                          <div className="flex items-center mb-3">
                            <div className="p-2 rounded-lg ml-2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-blue-600 dark:text-blue-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                            </div>
                            <h3 className="text-lg font-bold text-text">
                              هزینه تور
                            </h3>
                          </div>
                          <p className="text-text text-sm mb-2">
                            شروع قیمت از:
                          </p>
                          <div className="flex items-end mb-3">
                            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                              1,500,000
                            </p>
                            <p className="text-text mr-2">تومان</p>
                          </div>
                          <div className="flex items-center">
                            <span className="inline-flex items-center px-2 py-1 bg-background text-text text-xs font-medium rounded-md">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-3 w-3 mr-1.5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                              امکان پرداخت اقساطی
                            </span>
                          </div>
                        </div>
                        <div className="border border-border p-4 sm:p-5 rounded-xl transition-colors duration-300 bg-surface">
                          <div className="flex items-center mb-3">
                            <div className="p-2 rounded-lg ml-2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-blue-600 dark:text-blue-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                              </svg>
                            </div>
                            <h3 className="text-lg font-bold text-text">
                              زمانبندی تور
                            </h3>
                          </div>
                          <div className="grid grid-cols-2 gap-3 mb-3">
                            <div className="bg-background p-2 rounded-lg">
                              <p className="text-text text-xs mb-1">
                                تاریخ شروع:
                              </p>
                              <p className="font-bold text-shadow-text-secondary text-sm">
                                11 تیر 1400
                              </p>
                            </div>
                            <div className="bg-background p-2 rounded-lg">
                              <p className="text-text text-xs mb-1">
                                تاریخ پایان:
                              </p>
                              <p className="font-bold text-shadow-text-secondary text-sm">
                                15 تیر 1400
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 text-blue-600 dark:text-blue-400 mr-2"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            <p className="text-text-secondary text-sm">
                              مدت زمان:{" "}
                              <span className="font-bold text-blue-600 dark:text-blue-400">
                                5 روز
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 mt-4 sm:mt-5">
                        <div className="border border-border p-4 sm:p-5 rounded-xl transition-colors duration-300 bg-surface">
                          <div className="flex items-center mb-3">
                            <div className="p-2 rounded-lg ml-2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-blue-600 dark:text-blue-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            </div>
                            <h3 className="text-lg font-bold text-text">
                              خدمات شامل
                            </h3>
                          </div>
                          <ul className="space-y-2">
                            <li className="flex gap-2 items-center">
                              <div className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 mr-3 flex-shrink-0"></div>
                              <span className="text-text text-sm">
                                حمل و نقل رایگان (هوایی و زمینی)
                              </span>
                            </li>
                            <li className="flex gap-2 items-center">
                              <div className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 mr-3 flex-shrink-0"></div>
                              <span className="text-text text-sm">
                                راهنمای تور حرفه‌ای دو زبانه
                              </span>
                            </li>
                            <li className="flex gap-2 items-center">
                              <div className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 mr-3 flex-shrink-0"></div>
                              <span className="text-text text-sm">
                                صبحانه و ناهار در رستوران‌های معتبر
                              </span>
                            </li>
                            <li className="flex gap-2 items-center">
                              <div className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 mr-3 flex-shrink-0"></div>
                              <span className="text-text text-sm">
                                ورودیه جاذبه‌های گردشگری
                              </span>
                            </li>
                          </ul>
                        </div>

                        <div className="border border-border p-4 sm:p-5 rounded-xl transition-colors duration-300 bg-surface">
                          <div className="flex items-center mb-3">
                            <div className="p-2 rounded-lg ml-2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-blue-600 dark:text-blue-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                />
                              </svg>
                            </div>
                            <h3 className="text-lg font-bold text-text">
                              امکانات ویژه
                            </h3>
                          </div>
                          <ul className="space-y-2">
                            <li className="flex gap-2 items-center">
                              <div className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 mr-3 flex-shrink-0"></div>
                              <span className="text-text-secondary text-sm">
                                بیمه مسافرتی با پوشش کامل
                              </span>
                            </li>
                            <li className="flex gap-2 items-center">
                              <div className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 mr-3 flex-shrink-0"></div>
                              <span className="text-text-secondary text-sm">
                                اقامت در هتل 4 ستاره با خدمات عالی
                              </span>
                            </li>
                            <li className="flex gap-2 items-center">
                              <div className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 mr-3 flex-shrink-0"></div>
                              <span className="text-text-secondary text-sm">
                                دسترسی به اینترنت پرسرعت رایگان
                              </span>
                            </li>
                            <li className="flex gap-2 items-center">
                              <div className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 mr-3 flex-shrink-0"></div>
                              <span className="text-text-secondary text-sm">
                                هدیه ویژه به همراه سوغاتی
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="mt-4 sm:mt-5 border border-border p-4 sm:p-5 rounded-xl transition-colors duration-300 bg-surface">
                        <div className="flex items-center mb-3">
                          <div className="p-2 rounded-lg ml-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 text-blue-600 dark:text-blue-400"
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
                          </div>
                          <h3 className="text-lg font-bold text-text">
                            ویژگی‌های برجسته
                          </h3>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          <div className="flex flex-col items-center justify-center p-3 rounded-lg">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 text-blue-600 dark:text-blue-400 mb-2"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                              />
                            </svg>
                            <span className="text-xs text-text-secondary text-center">
                              اقامت لوکس
                            </span>
                          </div>
                          <div className="flex flex-col items-center justify-center p-3 rounded-lg">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 text-blue-600 dark:text-blue-400 mb-2"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            <span className="text-xs text-text-secondary text-center">
                              قیمت مناسب
                            </span>
                          </div>
                          <div className="flex flex-col items-center justify-center -700 p-3 rounded-lg">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 text-blue-600 dark:text-blue-400 mb-2"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                              />
                            </svg>
                            <span className="text-xs text-text-secondary text-center">
                              راهنمای مجرب
                            </span>
                          </div>
                          <div className="flex flex-col items-center justify-center  p-3 rounded-lg">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 text-blue-600 dark:text-blue-400 mb-2"
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
                            <span className="text-xs text-text-secondary text-center">
                              امنیت کامل
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 sm:mt-5 text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 text-text bg-surface text-sm rounded-lg border border-border">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-blue-600 dark:text-blue-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          امکان کنسلی رایگان تا 7 روز قبل از حرکت
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          <div className=" w-[39%] max-[1027px]:w-full">
            <div className="max-[1027px]:hidden">
              <h1 className="text-[32px] font-bold text-text">
                تور گردشگری سالار دره
              </h1>
              <div className="flex gap-2 mt-2 mb-[47px] items-center">
                <MapSVG color="#7e7e7e" />
                <h1 className="text-[14px] font-medium text-text-secondary">
                  ساری, سالار دره
                </h1>
              </div>
            </div>
            <div className="sticky top-4 ">
              <div className="border-[1px] rounded-2xl flex flex-col flex-wrap gap-4 border-border h-auto w-full p-6">
                <h2 className="text-2xl font-bold mb-4 text-center">
                  ثبت نام در تور
                </h2>
                <div>
                  <label htmlFor="fullName" className="block mb-1 font-medium">
                    نام و نام خانوادگی
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder=" نام و نام خانوادگی را وارد کنید"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block mb-1 font-medium">
                    شماره تلفن
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="09xxxxxxxxx"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="participants"
                    className="block mb-1 font-medium"
                  >
                    تعداد نفرات
                  </label>
                  <select
                    id="participants"
                    name="participants"
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="1">1 نفر</option>
                    <option value="2">2 نفر</option>
                    <option value="3">3 نفر</option>
                    <option value="4">4 نفر</option>
                    <option value="5+">5 نفر یا بیشتر</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="email" className="block mb-1 font-medium">
                    ایمیل (اختیاری)
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="example@gmail.com"
                  />
                </div>

                <div>
                  <label htmlFor="notes" className="block mb-1 font-medium">
                    توضیحات اضافه (اختیاری)
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows="3"
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="درخواست‌های خاص یا توضیحات اضافه"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition duration-200"
                >
                  ثبت نام در تور
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;

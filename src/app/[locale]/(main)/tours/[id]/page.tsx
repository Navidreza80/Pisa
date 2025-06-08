"use client";

import MapComponent from "@/components/common/map/map";
import MapSVG from "@/components/common/svg/map";
import RegisterForm from "@/components/tours-detail/tour-register-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getTourById } from "@/lib/actions/tours";
import { formatDate } from "@/utils/helper/format-date";
import { Calendar, Clock, MapPin, Stars } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

function Page() {
  const [tourDetails, setTourDetails] = useState({});
  const { id: TourId }: { id: string } = useParams();

  const getToursDetail = async () => {
    const res = await getTourById(TourId);
    console.table(res);
    setTourDetails(res);
  };

  const {
    id,
    tourName,
    tourLocation,
    tourImage,
    schedule,
    tourDescription,
    tags,
    price,
    startDate,
    endDate,
    services,
    facilities,
    cancelTill,
    lat,
    lng,
  } = tourDetails;

  useEffect(() => {
    getToursDetail();
  }, []);

  return (
    <>
      <div
        dir="rtl"
        className="px-4 sm:px-6 md:px-12 lg:px-24 pt-6 sm:pt-10 md:pt-12  transition-colors duration-200 relative overflow-hidden"
      >
        <div className="flex flex-col lg:flex-row-reverse lg:justify-between w-full gap-8">
          <div className="mt-10 max-[1027px]:mt-0 w-[58%] max-[1027px]:w-full">
            <div className="max-[1027px]:block hidden">
              <h1 className="text-[32px] font-bold text-text">{tourName}</h1>
              <div className="flex gap-2 mt-2 mb-[47px] items-center">
                <MapSVG color="#7e7e7e" />
                <h1 className="text-[14px] font-medium text-text-secondary">
                  {tourLocation}
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
                  {schedule?.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="border border-border rounded-xl p-4 sm:p-5"
                      >
                        <div className="flex items-center mb-3">
                          <div className="p-2 rounded-lg ml-3">
                            <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                          </div>
                          <h4 className="text-lg font-bold text-text">
                            {item.title}
                          </h4>
                        </div>
                        <div className="space-y-3 mr-12 border-r border-dashed border-border pr-5">
                          {item.todos?.map((item, index) => {
                            return (
                              <div key={index} className="relative">
                                <div className="absolute right-[-29px] top-1 w-4 h-4 rounded-full bg-blue-600 dark:bg-blue-500"></div>
                                <div className="flex items-center">
                                  <Clock className="w-4 h-4 text-shadow-text-secondary ml-2" />
                                  <span className="text-sm text-shadow-text-secondary">
                                    {item.time}
                                  </span>
                                  <span className="mx-2 text-shadow-text-secondary">
                                    -
                                  </span>
                                  <p className="text-text">{item.todo}</p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </TabsContent>

              <TabsContent value="map" className="mt-2">
                <Image
                  className="w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] rounded-2xl border border-gray-200 dark:border-gray-700 object-cover"
                  width={632}
                  height={400}
                  src={tourImage || null}
                  alt={tourName}
                />
                <h1 className="mt-6 text-base text-text leading-relaxed">
                  {tourDescription}
                </h1>

                {lat && lng && (
                  <div className="mt-10 rounded-xl overflow-hidden w-full h-100">
                    <MapComponent
                      initialLocation={[Number(lat), Number(lng)]}
                      initialZoom={13}
                    ></MapComponent>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="Advantages" className="mt-2">
                <div className=" rounded-2xl overflow-hidden border border-border shadow-sm">
                  <div className="relative">
                    <div className="pt-6 pb-4 px-6 border-b border-border">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                        <div>
                          <span className="inline-block px-3 py-1 rounded-md text-blue-600 dark:text-blue-300 text-sm font-medium mb-2">
                            {tags}
                          </span>
                          <h2 className="text-xl sm:text-2xl font-bold text-shadow-text mb-1">
                            مزایای اختصاصی {tourName}
                          </h2>
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
                              {price?.price}
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
                              {price?.type}
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
                                {formatDate(startDate)}
                              </p>
                            </div>
                            <div className="bg-background p-2 rounded-lg">
                              <p className="text-text text-xs mb-1">
                                تاریخ پایان:
                              </p>
                              <p className="font-bold text-shadow-text-secondary text-sm">
                                {formatDate(endDate)}
                              </p>
                            </div>
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
                            {services?.map((item: string, index: number) => {
                              return (
                                <li
                                  key={index}
                                  className="flex gap-2 items-center"
                                >
                                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 mr-3 flex-shrink-0"></div>
                                  <span className="text-text text-sm">
                                    {item}
                                  </span>
                                </li>
                              );
                            })}
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
                            {facilities?.map((item, index) => {
                              return (
                                <li
                                  key={index}
                                  className="flex gap-2 items-center"
                                >
                                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 mr-3 flex-shrink-0"></div>
                                  <span className="text-text-secondary text-sm">
                                    {item}
                                  </span>
                                </li>
                              );
                            })}
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
                          امکان کنسلی رایگان تا {cancelTill} روز قبل از حرکت
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          <div className="w-[39%] max-[1027px]:w-full">
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
            <div>
              <RegisterForm tourId={id} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;

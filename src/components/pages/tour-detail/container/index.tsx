"use client";

import MapComponent from "@/components/common/map/map";
import MapSVG from "@/components/common/svg/map";
import RegisterForm from "@/components/pages/tour-detail/forms/tour-register-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getTourById } from "@/lib/actions/tours";
import { formatDate } from "@/utils/helper/format-date";
import { Calendar, Clock, MapPin, Stars } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  PriceSVG,
  CalendarSVG,
  CheckSVG,
  ServiceSVG,
  FacilitySVG,
  FeatureSVG,
  FreeCancelSVG,
} from "@/components/svg";

type ScheduleTodo = {
  time: string;
  todo: string;
};
type ScheduleItem = {
  title: string;
  todos: ScheduleTodo[];
};
type PriceType = {
  price: string;
  type: string;
};
type TourDetails = {
  id?: string;
  tourName?: string;
  tourLocation?: string;
  tourImage?: string;
  schedule?: ScheduleItem[];
  tourDescription?: string;
  tags?: string;
  price?: PriceType;
  startDate?: string;
  endDate?: string;
  services?: string[];
  facilities?: string[];
  cancelTill?: string | number;
  lat?: string | number;
  lng?: string | number;
};

function ToursDetailContainer() {
  const [tourDetails, setTourDetails] = useState<TourDetails>({});
  const params = useParams();
  const TourId = typeof params?.id === "string" ? params.id : "";

  const getToursDetail = async () => {
    const res = await getTourById(TourId);
    setTourDetails(res || {});
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
    if (TourId) getToursDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [TourId]);

  return (
    <>
      <div
        dir="rtl"
        className="px-4 sm:px-6 md:px-12 lg:px-24 pt-6 sm:pt-10 md:pt-12 transition-colors duration-200 relative overflow-hidden"
      >
        <div className="flex flex-col lg:flex-row-reverse lg:justify-between w-full gap-8">
          <div className="mt-10 max-[1027px]:mt-0 w-full lg:w-[58%]">
            <div className="block lg:hidden">
              <h1 className="text-2xl sm:text-3xl font-bold text-text">
                {tourName ?? ""}
              </h1>
              <div className="flex gap-2 mt-2 mb-8 items-center">
                <MapSVG color="#7e7e7e" />
                <h1 className="text-sm font-medium text-text-secondary">
                  {tourLocation ?? ""}
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
                  {schedule?.length ? (
                    schedule.map((item, index) => (
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
                          {item.todos?.length
                            ? item.todos.map((todo, idx) => (
                                <div key={idx} className="relative">
                                  <div className="absolute right-[-29px] top-1 w-4 h-4 rounded-full bg-blue-600 dark:bg-blue-500"></div>
                                  <div className="flex items-center">
                                    <Clock className="w-4 h-4 text-shadow-text-secondary ml-2" />
                                    <span className="text-sm text-shadow-text-secondary">
                                      {todo.time}
                                    </span>
                                    <span className="mx-2 text-shadow-text-secondary">
                                      -
                                    </span>
                                    <p className="text-text">{todo.todo}</p>
                                  </div>
                                </div>
                              ))
                            : null}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-gray-400">
                      برنامه‌ای ثبت نشده است.
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="map" className="mt-2">
                <Image
                  className="w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] rounded-2xl border border-gray-200 dark:border-gray-700 object-cover"
                  width={632}
                  height={400}
                  src={tourImage || "/images/placeholder.jpg"}
                  alt={tourName ?? "tour image"}
                />
                <h1 className="mt-6 text-base text-text leading-relaxed">
                  {tourDescription ?? ""}
                </h1>

                {lat && lng && (
                  <div className="mt-10 rounded-xl overflow-hidden w-full h-100">
                    <MapComponent
                      initialLocation={[
                        typeof lat === "string" ? Number(lat) : lat,
                        typeof lng === "string" ? Number(lng) : lng,
                      ]}
                      initialZoom={13}
                    />
                  </div>
                )}
              </TabsContent>

              <TabsContent value="Advantages" className="mt-2">
                <div className="rounded-2xl overflow-hidden border border-border shadow-sm">
                  <div className="relative">
                    <div className="pt-6 pb-4 px-6 border-b border-border">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                        <div>
                          <span className="inline-block px-3 py-1 rounded-md text-blue-600 dark:text-blue-300 text-sm font-medium mb-2">
                            {tags ?? ""}
                          </span>
                          <h2 className="text-xl sm:text-2xl font-bold text-shadow-text mb-1">
                            مزایای اختصاصی {tourName ?? ""}
                          </h2>
                        </div>
                        <div className="mt-4 md:mt-0">
                          <div className="flex items-center justify-center w-12 h-12 bg-background rounded-full">
                            <CheckSVG />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 sm:p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                        <div className="border border-border p-4 sm:p-5 rounded-xl bg-surface">
                          <div className="flex items-center mb-3">
                            <div className="p-2 rounded-lg ml-2">
                              <PriceSVG />
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
                              {price?.price ?? "-"}
                            </p>
                            <p className="text-text mr-2">تومان</p>
                          </div>
                          <div className="flex items-center">
                            <span className="inline-flex items-center px-2 py-1 bg-background text-text text-xs font-medium rounded-md">
                              <CheckSVG className="h-3 w-3 mr-1.5" />
                              {price?.type ?? ""}
                            </span>
                          </div>
                        </div>
                        <div className="border border-border p-4 sm:p-5 rounded-xl bg-surface">
                          <div className="flex items-center mb-3">
                            <div className="p-2 rounded-lg ml-2">
                              <CalendarSVG />
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
                                {startDate ? formatDate(startDate) : "-"}
                              </p>
                            </div>
                            <div className="bg-background p-2 rounded-lg">
                              <p className="text-text text-xs mb-1">
                                تاریخ پایان:
                              </p>
                              <p className="font-bold text-shadow-text-secondary text-sm">
                                {endDate ? formatDate(endDate) : "-"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 mt-4 sm:mt-5">
                        <div className="border border-border p-4 sm:p-5 rounded-xl bg-surface">
                          <div className="flex items-center mb-3">
                            <div className="p-2 rounded-lg ml-2">
                              <ServiceSVG />
                            </div>
                            <h3 className="text-lg font-bold text-text">
                              خدمات شامل
                            </h3>
                          </div>
                          <ul className="space-y-2">
                            {services?.length ? (
                              services.map((item: string, index: number) => (
                                <li
                                  key={index}
                                  className="flex gap-2 items-center"
                                >
                                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 mr-3 flex-shrink-0"></div>
                                  <span className="text-text text-sm">
                                    {item}
                                  </span>
                                </li>
                              ))
                            ) : (
                              <li className="text-gray-400 text-sm">
                                موردی ثبت نشده است.
                              </li>
                            )}
                          </ul>
                        </div>
                        <div className="border border-border p-4 sm:p-5 rounded-xl bg-surface">
                          <div className="flex items-center mb-3">
                            <div className="p-2 rounded-lg ml-2">
                              <FacilitySVG />
                            </div>
                            <h3 className="text-lg font-bold text-text">
                              امکانات ویژه
                            </h3>
                          </div>
                          <ul className="space-y-2">
                            {facilities?.length ? (
                              facilities.map((item: string, index: number) => (
                                <li
                                  key={index}
                                  className="flex gap-2 items-center"
                                >
                                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 mr-3 flex-shrink-0"></div>
                                  <span className="text-text-secondary text-sm">
                                    {item}
                                  </span>
                                </li>
                              ))
                            ) : (
                              <li className="text-gray-400 text-sm">
                                موردی ثبت نشده است.
                              </li>
                            )}
                          </ul>
                        </div>
                      </div>
                      <div className="mt-4 sm:mt-5 border border-border p-4 sm:p-5 rounded-xl bg-surface">
                        <div className="flex items-center mb-3">
                          <div className="p-2 rounded-lg ml-2">
                            <FeatureSVG />
                          </div>
                          <h3 className="text-lg font-bold text-text">
                            ویژگی‌های برجسته
                          </h3>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {/* ... keep your feature items here ... */}
                        </div>
                      </div>
                      <div className="mt-4 sm:mt-5 text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 text-text bg-surface text-sm rounded-lg border border-border">
                          <FreeCancelSVG />
                          امکان کنسلی رایگان تا {cancelTill ?? "-"} روز قبل از
                          حرکت
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          <div className="w-full lg:w-[39%]">
            <div className="hidden lg:block">
              <h1 className="text-2xl sm:text-3xl font-bold text-text">
                {tourName ?? ""}
              </h1>
              <div className="flex gap-2 mt-2 mb-8 items-center">
                <MapSVG color="#7e7e7e" />
                <h1 className="text-sm font-medium text-text-secondary">
                  {tourLocation ?? ""}
                </h1>
              </div>
            </div>
            <RegisterForm tourId={id ?? ""} />
          </div>
        </div>
      </div>
    </>
  );
}

export default ToursDetailContainer;

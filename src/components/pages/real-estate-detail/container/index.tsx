"use client";

import Logo from "@/assets/images/ContactUsLogoRealEstate.png";
import MapComponent from "@/components/common/map/map";
import MapSVG from "@/components/common/svg/map";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getRealEstateById } from "@/lib/actions/realestate";
import { RealEstate } from "@prisma/client";
import {
    Calendar,
    Clock,
    Globe,
    Hash,
    Headphones,
    Mail,
    MapPin,
    Phone,
    ShieldCheck,
    Stars
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react"; // Added useMemo

const workingHours = [
  { day: "شنبه", hours: "۰۹:۰۰ تا ۱۷:۰۰" },
  { day: "یکشنبه", hours: "۰۹:۰۰ تا ۱۷:۰۰" },
  { day: "دوشنبه", hours: "۰۹:۰۰ تا ۱۷:۰۰" },
  { day: "سه‌شنبه", hours: "۰۹:۰۰ تا ۱۷:۰۰" },
  { day: "چهارشنبه", hours: "۰۹:۰۰ تا ۱۷:۰۰" },
  { day: "پنجشنبه", hours: "۰۹:۰۰ تا ۱۳:۰۰" },
  { day: "جمعه", hours: "تعطیل" },
];
const getTodayIndex = () => {
  const today = new Date().getDay();
  // Adjust for Persian calendar where Saturday is the start of the week (index 0 for Date.getDay())
  // Sunday = 0, Monday = 1, ..., Saturday = 6
  // We want Saturday = 0, Sunday = 1, ... Friday = 6
  return today === 6 ? 0 : today + 1; // This logic seems correct if your workingHours array starts with Saturday
};

function RealEstateDetailContainer() {
  const [realEstateDetail, setRealEstateDetail] = useState<null | RealEstate>();
  const [isLoading, setIsLoading] = useState(true);
  const todayIndex = useMemo(() => getTodayIndex(), []); // Memoize for stability if component re-renders

  const fetchRealEstateById = async () => {
    setIsLoading(true);
    try {
      const response: RealEstate = await getRealEstateById("1"); // Consider making "1" dynamic
      setRealEstateDetail(response);
    } catch (error) {
      console.error("Failed to fetch real estate details:", error);
      setRealEstateDetail(null); // Set to null or an error state object
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRealEstateById();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen p-4">
        در حال بارگذاری اطلاعات...
      </div>
    );
  }

  if (!realEstateDetail) {
    return (
      <div className="flex justify-center items-center min-h-screen p-4">
        اطلاعات ملک مورد نظر یافت نشد.
      </div>
    );
  }

  return (
    <>
      <div
        dir="rtl"
        className="px-4 sm:px-6 md:px-12 lg:px-24 pt-6 sm:pt-10 md:pt-12 transition-colors duration-200 relative overflow-hidden"
      >
        <div className="flex flex-col lg:flex-row-reverse lg:justify-between w-full gap-8">
          {/* Content Column */}
          <div className="w-full lg:w-7/12 mt-10 lg:mt-0">
            {/* Mobile Title/Address */}
            <div className="block lg:hidden">
              <h1 className="text-2xl sm:text-3xl font-bold text-text">
                {realEstateDetail.name ?? "نام ملک"}
              </h1>
              <div className="flex gap-2 mt-2 mb-8 sm:mb-12 items-center">
                <MapSVG color="#7e7e7e" />
                <h1 className="text-sm font-medium text-text-secondary">
                  {realEstateDetail.address ?? "آدرس نامشخص"}
                </h1>
              </div>
            </div>

            <Tabs defaultValue="Information" dir="rtl" className="w-full">
              <TabsList className="w-full flex justify-between mb-6 bg-transparent p-0 h-auto">
                <TabsTrigger
                  value="WorkingHours"
                  className="flex-1 py-3 rounded-t-lg border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary dark:data-[state=active]:border-primary dark:data-[state=active]:text-primary bg-transparent text-text-secondary hover:text-primary transition-colors"
                >
                  <Calendar className="w-5 h-5 ml-2" />
                  ساعات کاری
                </TabsTrigger>
                <TabsTrigger
                  value="Information"
                  className="flex-1 py-3 rounded-t-lg border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary dark:data-[state=active]:border-primary dark:data-[state=active]:text-primary bg-transparent text-text-secondary hover:text-primary transition-colors"
                >
                  <Stars className="w-5 h-5 ml-2" />
                  اطلاعات
                </TabsTrigger>
              </TabsList>

              <TabsContent value="WorkingHours" className="mt-2">
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-xl font-bold px-1 sm:px-4 text-text">ساعات کاری</h3>
                  {workingHours.map((item, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between px-4 sm:px-5 py-3 rounded-lg border transition-all duration-150 cursor-default
                        ${
                          index === todayIndex
                            ? "border-primary text-primary font-semibold bg-primary/5"
                            : "border-border text-text-secondary hover:border-gray-400 dark:hover:border-gray-600 shadow-sm"
                        }
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <Clock
                          className={`w-5 h-5 ${index === todayIndex ? "text-primary" : "text-text-secondary/80"}`}
                        />
                        <span className="text-base">{item.day}</span>
                      </div>
                      <span className="text-sm font-medium">{item.hours}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="Information" className="mt-2">
                <Image
                  className="w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] rounded-2xl border border-border object-cover shadow-md"
                  width={632}
                  height={400}
                  src={realEstateDetail.image || "/placeholder-image.jpg"} // Added fallback
                  alt={realEstateDetail.name || "تصویر ملک"} // Added fallback
                />

                <div className="mt-8 md:mt-10">
                  <div className="text-text">
                    <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-5">
                      <Image
                        className="rounded-xl w-24 h-24 sm:w-28 sm:h-28 object-cover border border-border shadow-sm"
                        src={realEstateDetail.founderImage || "/default-avatar.png"} // Added fallback
                        width={100}
                        height={100}
                        alt={realEstateDetail.founder || "موسس"} // Added fallback
                        unoptimized
                      />
                      <div className="flex flex-col gap-y-1">
                        <p className="text-text font-bold text-2xl sm:text-3xl">
                          {realEstateDetail.founder || "نام موسس"}
                        </p>
                        <p className="text-text-secondary font-semibold text-lg sm:text-xl">
                          {realEstateDetail.name || "نام شرکت"}
                        </p>
                      </div>
                    </div>
                    <p className="mt-4 text-base md:text-lg leading-relaxed text-text-secondary">
                      {realEstateDetail.storyOfFoundation || "داستان تاسیس ارائه نشده است."}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 py-6 px-4 sm:px-6 md:px-8 rounded-2xl border border-border mt-8 md:mt-10 shadow-sm">
                  <div className="flex-1 space-y-4 text-text">
                    {/* Contact Items */}
                    {[
                      { icon: MapPin, text: realEstateDetail.address, label: "آدرس" },
                      { icon: Phone, text: realEstateDetail.phoneNumber, href: `tel:${realEstateDetail.phoneNumber}`, label: "تلفن" },
                      { icon: Headphones, text: realEstateDetail.supportNumber, href: `tel:${realEstateDetail.supportNumber}`, label: "پشتیبانی" , prefix: "پشتیبانی: "},
                      { icon: Mail, text: realEstateDetail.email, href: `mailto:${realEstateDetail.email}`, label: "ایمیل" },
                      { icon: Globe, text: realEstateDetail.website, href: realEstateDetail.website, target: "_blank", label: "وبسایت" },
                      { icon: Calendar, text: realEstateDetail.yearOfEstablish, label: "سال تاسیس", prefix: "سال تأسیس: " },
                      { icon: Hash, text: realEstateDetail.registrationNumber, label: "شماره ثبت", prefix: "شماره ثبت: " },
                      { icon: ShieldCheck, text: realEstateDetail.nationalCode, label: "شناسه ملی", prefix: "شناسه ملی: " },
                    ].map((item, index) => item.text ? (
                      <div key={index} className="flex items-start gap-3">
                        <item.icon className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                        {item.href ? (
                          <Link href={item.href} target={item.target} className="hover:text-primary transition-colors break-all">
                            {item.prefix}{item.text}
                          </Link>
                        ) : (
                          <span className="break-words">{item.prefix}{item.text}</span>
                        )}
                      </div>
                    ) : null)}
                  </div>
                  {/* Logo - visible on sm screens and up */}
                  <div className="hidden sm:flex sm:w-2/5 lg:w-1/3 items-center justify-center p-4">
                    <Image
                      src={Logo}
                      alt={`${realEstateDetail.name || "Company"} Logo`}
                      className="max-w-full h-auto object-contain"
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Map Column */}
          <div className="w-full lg:w-5/12">
            {/* Desktop Title/Address */}
            <div className="hidden lg:block">
              <h1 className="text-2xl sm:text-3xl font-bold text-text">
                {realEstateDetail.name ?? "نام ملک"}
              </h1>
              <div className="flex gap-2 mt-2 mb-8 sm:mb-12 items-center">
                <MapSVG color="#7e7e7e" />
                <h1 className="text-sm font-medium text-text-secondary">
                  {realEstateDetail.city ?? "شهر نامشخص"}
                </h1>
              </div>
            </div>
            <div className="sticky top-6 h-[30rem] md:h-[35rem] rounded-2xl overflow-hidden border border-border shadow-md">
              {realEstateDetail.lat && realEstateDetail.lng && (
                <MapComponent
                  className="w-full h-full" // Ensure map takes full dimensions of its container
                  initialLocation={[
                    Number(realEstateDetail.lat), // Ensure lat/lng are numbers
                    Number(realEstateDetail.lng),
                  ]}
                  initialZoom={15} // Slightly more zoomed in
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RealEstateDetailContainer;

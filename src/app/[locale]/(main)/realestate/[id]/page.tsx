"use client";

import Logo from "@/assets/images/ContactUsLogoRealEstate.png";
import MapComponent from "@/components/common/map/map";
import MapSVG from "@/components/common/svg/map";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getRealEstateById } from "@/lib/actions/realestate";
import RealEstate from "@/types/real-estates";
import {
  Calendar,
  Clock,
  Globe,
  Hash,
  Headphones,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
  ShieldCheck,
  Stars,
  Twitter,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

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
  return today === 6 ? 0 : today + 1;
};

function Page() {
  const [realEstateDetail, setRealEstateDetail] = useState<null | RealEstate>();
  const todayIndex = getTodayIndex();

  const fetchRealEstateById = async () => {
    const response = await getRealEstateById("1");
    setRealEstateDetail(response);
  };

  useEffect(() => {
    fetchRealEstateById();
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
              <h1 className="text-[32px] font-bold text-text"></h1>
              <div className="flex gap-2 mt-2 mb-[47px] items-center">
                <MapSVG color="#7e7e7e" />
                <h1 className="text-[14px] font-medium text-text-secondary">
                  ساری, زعفرانیه
                </h1>
              </div>
            </div>
            <Tabs defaultValue="Information" dir="rtl" className="w-full">
              <TabsList className="w-full flex justify-between mb-6 bg-transparent p-0 h-auto">
                <TabsTrigger
                  value="WorkingHours"
                  className="flex-1 py-3 rounded-t-lg border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 dark:data-[state=active]:border-blue-400 bg-transparent"
                >
                  <Calendar className="w-5 h-5 ml-2" />
                  ساعات کاری
                </TabsTrigger>
                <TabsTrigger
                  value="Information"
                  className="flex-1 py-3 rounded-t-lg border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 dark:data-[state=active]:border-blue-400 bg-transparent"
                >
                  <Stars className="w-5 h-5 ml-2" />
                  اطلاعات
                </TabsTrigger>
              </TabsList>

              <TabsContent value="WorkingHours" className="mt-2">
                <div className="space-y-6">
                  <h3 className="text-lg font-bold px-4">ساعات کاری</h3>
                  {workingHours.map((item, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between px-5 py-3 mb-2 rounded-lg border transition-colors duration-150 cursor-pointer
            ${
              index === todayIndex
                ? " border-primary text-primary font-semibold"
                : "border-border text-text-secondary hover:border-text-secondary shadow-2xs"
            }
          `}
                    >
                      <div className="flex items-center gap-3">
                        <Clock
                          className={`w-5 h-5 ${index === todayIndex ? "text-primary" : "text-text-secondary"}`}
                        />
                        <span className="text-base">{item.day}</span>
                      </div>
                      <span className="text-sm">{item.hours}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="Information" className="mt-2">
                <Image
                  className="w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] rounded-2xl border border-border object-cover"
                  width={632}
                  height={400}
                  src={realEstateDetail?.image}
                  alt={realEstateDetail?.name}
                />

                <div className="mt-10 overflow-hidden">
                  <div className="text-text">
                    <div className="flex items-start gap-5">
                      {" "}
                      <Image
                        className="rounded-2xl w-[100px] aspect-square mb-4"
                        src={realEstateDetail?.founderImage}
                        width={100}
                        height={100}
                        alt={realEstateDetail?.founder}
                        unoptimized
                      />
                      <div className="flex flex-col gap-y-3">
                        {" "}
                        <p className="text-text font-bold text-3xl">
                          {realEstateDetail?.founder}
                        </p>
                        <p className="text-text-secondary font-semibold text-xl">
                          {realEstateDetail?.name}
                        </p>
                      </div>
                    </div>

                    {realEstateDetail?.storyOfFoundation}
                  </div>
                </div>

                <div></div>
                <div className=" flex gap-8 py-6 px-10 rounded-2xl border border-border mt-10">
                  <div className="flex-1 w-[100%] space-y-4 text-text">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-primary mt-1" />
                      <span>{realEstateDetail?.address}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-primary" />
                      <Link
                        href="tel:+982112345678"
                        className="hover:underline"
                      >
                        {realEstateDetail?.phoneNumber}
                      </Link>
                    </div>

                    <div className="flex items-center gap-3">
                      <Headphones className="w-5 h-5 text-primary" />
                      <Link
                        href="tel:+982112345679"
                        className="hover:underline"
                      >
                        پشتیبانی: {realEstateDetail?.supportNumber}
                      </Link>
                    </div>

                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-primary" />
                      <a
                        href="mailto:info@technovin.com"
                        className="hover:underline"
                      >
                        {realEstateDetail?.email}
                      </a>
                    </div>

                    <div className="flex items-center gap-3">
                      <Globe className="w-5 h-5 text-primary" />
                      <a
                        href="https://www.technovin.com"
                        target="_blank"
                        className="hover:underline"
                      >
                        {realEstateDetail?.website}
                      </a>
                    </div>

                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-primary" />
                      <span>
                        سال تأسیس: {realEstateDetail?.yearOfEstablish}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <Hash className="w-5 h-5 text-primary" />
                      <span>
                        شماره ثبت: {realEstateDetail?.registrationNumber}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <ShieldCheck className="w-5 h-5 text-primary" />
                      <span>شناسه ملی: {realEstateDetail?.nationalCode}</span>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <a
                        href="https://instagram.com/technovin"
                        target="_blank"
                        aria-label="Instagram"
                      >
                        <Instagram className="text-pink-500 hover:scale-110 transition" />
                      </a>
                      <a
                        href="https://linkedin.com/company/technovin"
                        target="_blank"
                        aria-label="LinkedIn"
                      >
                        <Linkedin className="text-blue-700 hover:scale-110 transition" />
                      </a>
                      <a
                        href="https://twitter.com/technovin"
                        target="_blank"
                        aria-label="Twitter"
                      >
                        <Twitter className="text-sky-500 hover:scale-110 transition" />
                      </a>
                      <a
                        href="https://t.me/technovin"
                        target="_blank"
                        aria-label="Telegram"
                      >
                        <Send className="text-blue-400 hover:scale-110 transition" />
                      </a>
                    </div>
                  </div>
                  <Image
                    src={Logo}
                    alt=""
                    className="my-auto max-[650px]:hidden ml-10 w-[30%] scale-200 overflow-hidden"
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>
          <div className=" w-[39%] max-[1027px]:w-full">
            <div className="max-[1027px]:hidden">
              <h1 className="text-[32px] font-bold text-text">
                {realEstateDetail?.name}
              </h1>
              <div className="flex gap-2 mt-2 mb-[47px] items-center">
                <MapSVG color="#7e7e7e" />
                <h1 className="text-[14px] font-medium text-text-secondary">
                  {realEstateDetail?.city}
                </h1>
              </div>
            </div>
            <div className="sticky top-4 h-100">
              {realEstateDetail?.lat && (
                <MapComponent
                  className="!rounded-2xl"
                  initialLocation={[
                    realEstateDetail?.lat,
                    realEstateDetail?.lng,
                  ]}
                  initialZoom={13}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;

"use client";

import React, { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { FaUser, FaCalendarAlt, FaHome, FaBed, FaBath, FaRulerCombined, FaHeart, FaShareAlt } from "react-icons/fa";
import { MdLocationOn, MdCompare } from "react-icons/md";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";


interface HouseData {
  id: number;
  title: string;
  location: string;
  agent: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  builtYear: string;
  image: string;
  rating: number;
}

const ComparisonPage = () => {
  const t = useTranslations("Comparison");
  const router = useRouter();
  const locale = useLocale();


  const isRTL = locale === 'ar' || locale === 'fa';
  const [houses, setHouses] = useState<HouseData[]>([
    {
      id: 1,
      title: "خونه بد",
      location: "عشق اباد",
      agent: "نویدرضا عباس زاده",
      price: 9900000000000,
      bedrooms: 0,
      bathrooms: 0,
      area: 21,
      builtYear: "1291",
      image: "https://www.houseplans.net/news/wp-content/uploads/2023/07/57260-768.jpeg",
      rating: 0,
    },
    {
      id: 2,
      title: "خونه خفن",
      location: "امریکا",
      agent: "محمدطاها طالبی",
      price: 850000,
      bedrooms: 1253,
      bathrooms: 999,
      area: 180000,
      builtYear: "1404",
      image: "https://www.houseplans.net/news/wp-content/uploads/2023/07/57260-768.jpeg",
      rating: 5
    }
  ]);

  const renderRating = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={`text-lg ${i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"}`}>★</span>
        ))}
        <span className="ml-1 text-sm font-medium">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div className={`container mx-auto py-8 px-4 sm:py-12 ${isRTL ? 'rtl' : 'ltr'}`}>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8 sm:mb-12"
      >
        <h1 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          {t("title")}
        </h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-sm sm:text-base">
          {t("subtitle")}
        </p>
      </motion.div>

      <Tabs defaultValue="visual" className="w-full mb-8 sm:mb-12">
        <TabsList className="grid w-full max-w-xs sm:max-w-md mx-auto grid-cols-2">
          <TabsTrigger value="visual">{t("visualComparison")}</TabsTrigger>
          <TabsTrigger value="table">{t("tableComparison")}</TabsTrigger>
        </TabsList>

        <TabsContent value="visual" className="mt-4 sm:mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
            {houses.map((house, index) => (
              <motion.div
                key={house.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <Card className="overflow-hidden h-full rounded-xl border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-gray-800/60 backdrop-blur-sm p-4">
                  <div className="relative h-48 sm:h-64 w-full">
                    <Image
                      src={house.image}
                      alt={house.title}
                      fill
                      className="rounded-xl object-cover transition-transform duration-300 hover:scale-[1.02]"
                    />
                    <div className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} flex gap-2`}>
                      <Badge className="bg-primary">
                        {renderRating(house.rating)}
                      </Badge>
                    </div>
                    <div className={`absolute bottom-4 ${isRTL ? 'left-4' : 'right-4'} flex gap-2`}>
                      <Button size="icon" variant="secondary" className="rounded-full bg-primary/10 hover:bg-primary/20">
                        <FaHeart className="text-primary" />
                      </Button>
                      <Button size="icon" variant="secondary" className="rounded-full bg-primary/10 hover:bg-primary/20">
                        <FaShareAlt className="text-primary" />
                      </Button>
                    </div>
                  </div>

                  <CardContent className="p-4 sm:p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h2 className="text-xl sm:text-2xl font-bold mb-2 text-gray-800 dark:text-white">{house.title}</h2>
                        <div className="flex items-center text-gray-600 dark:text-gray-300">
                          <MdLocationOn className={`text-primary ${isRTL ? 'ml-1' : 'mr-1'}`} />
                          <span className="text-xs sm:text-sm">{house.location}</span>
                        </div>
                      </div>
                      <div className="text-lg sm:text-xl font-bold text-primary">
                        {house.price} تومان
                      </div>
                    </div>

                    <Separator className="my-4" />

                    <div className="grid grid-cols-2 gap-y-4 mb-6">
                      <div className="flex items-center">
                        <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/10 flex items-center justify-center ${isRTL ? 'ml-2 sm:ml-3' : 'mr-2 sm:mr-3'}`}>
                          <FaBed className="text-primary text-sm sm:text-base" />
                        </div>
                        <div>
                          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{t("bedrooms")}</p>
                          <p className="font-medium text-sm sm:text-base">{house.bedrooms}</p>
                        </div>
                      </div>

                      <div className="flex items-center">
                        <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/10 flex items-center justify-center ${isRTL ? 'ml-2 sm:ml-3' : 'mr-2 sm:mr-3'}`}>
                          <FaBath className="text-primary text-sm sm:text-base" />
                        </div>
                        <div>
                          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{t("bathrooms")}</p>
                          <p className="font-medium text-sm sm:text-base">{house.bathrooms}</p>
                        </div>
                      </div>

                      <div className="flex items-center">
                        <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/10 flex items-center justify-center ${isRTL ? 'ml-2 sm:ml-3' : 'mr-2 sm:mr-3'}`}>
                          <FaRulerCombined className="text-primary text-sm sm:text-base" />
                        </div>
                        <div>
                          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{t("area")}</p>
                          <p className="font-medium text-sm sm:text-base">{house.area} {t("squareMeters")}</p>
                        </div>
                      </div>

                      <div className="flex items-center">
                        <div className={`text-xl sm:text-2xl font-bold mb-2 text-gray-800 dark:text-whitez ${isRTL ? 'ml-2 sm:ml-3' : 'mr-2 sm:mr-3'}`}>
                          <FaCalendarAlt className="text-primary text-sm sm:text-base" />
                        </div>
                        <div>
                          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{t("builtYear")}</p>
                          <p className="font-medium text-sm sm:text-base">{house.builtYear}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-gray-600 dark:text-gray-300">
                        <FaUser className={`text-primary ${isRTL ? 'ml-2' : 'mr-2'} text-sm sm:text-base`} />
                        <span className="text-xs sm:text-sm">{house.agent}</span>
                      </div>

                      <Button
                        className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-700 text-white text-xs sm:text-sm"
                        onClick={() => router.push(`/properties/${house.id}`)}
                      >
                        {t("viewDetails")}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="table" className="mt-4 sm:mt-6">
          <Card className="border-0 shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-primary/10">
                    <th className={`p-3 sm:p-4 text-xs sm:text-sm ${isRTL ? 'text-left' : 'text-right'}`}>{t("specifications")}</th>
                    {houses.map(house => (
                      <th key={house.id} className="p-3 sm:p-4 text-center text-xs sm:text-sm">{house.title}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <td className="p-3 sm:p-4 font-medium text-xs sm:text-sm">{t("image")}</td>
                    {houses.map(house => (
                      <td key={house.id} className="p-3 sm:p-4 text-center">
                        <div className="relative h-16 sm:h-24 w-24 sm:w-32 mx-auto rounded-lg overflow-hidden">
                          <Image
                            src={house.image}
                            alt={house.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/30">
                    <td className={`p-3 sm:p-4 font-medium text-xs sm:text-sm `}>{t("price")}</td>
                    {houses.map(house => (
                      <td key={house.id} className="p-3 sm:p-4 text-center text-xs sm:text-sm">
                        {house.price} تومان
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <td className="p-3 sm:p-4 font-medium text-xs sm:text-sm">{t("location")}</td>
                    {houses.map(house => (
                      <td key={house.id} className="p-3 sm:p-4 text-center text-xs sm:text-sm">{house.location}</td>
                    ))}
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/30">
                    <td className="p-3 sm:p-4 font-medium text-xs sm:text-sm">{t("bedrooms")}</td>
                    {houses.map(house => (
                      <td key={house.id} className="p-3 sm:p-4 text-center text-xs sm:text-sm">{house.bedrooms}</td>
                    ))}
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <td className="p-3 sm:p-4 font-medium text-xs sm:text-sm">{t("bathrooms")}</td>
                    {houses.map(house => (
                      <td key={house.id} className="p-3 sm:p-4 text-center text-xs sm:text-sm">{house.bathrooms}</td>
                    ))}
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/30">
                    <td className="p-3 sm:p-4 font-medium text-xs sm:text-sm">{t("area")}</td>
                    {houses.map(house => (
                      <td key={house.id} className="p-3 sm:p-4 text-center text-xs sm:text-sm">{house.area} {t("squareMeters")}</td>
                    ))}
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <td className="p-3 sm:p-4 font-medium text-xs sm:text-sm">{t("builtYear")}</td>
                    {houses.map(house => (
                      <td key={house.id} className="p-3 sm:p-4 text-center text-xs sm:text-sm">{house.builtYear}</td>
                    ))}
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/30">
                    <td className="p-3 sm:p-4 font-medium text-xs sm:text-sm">{t("rating")}</td>
                    {houses.map(house => (
                      <td key={house.id} className="p-3 sm:p-4">
                        <div className="flex justify-center">
                          {renderRating(house.rating)}
                        </div>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 sm:p-4 font-medium text-xs sm:text-sm">{t("agent")}</td>
                    {houses.map(house => (
                      <td key={house.id} className="p-3 sm:p-4 text-center text-xs sm:text-sm">{house.agent}</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>

          <div className="flex flex-wrap justify-center mt-4 sm:mt-6 gap-2 sm:gap-4">
            {houses.map(house => (
              <Button
                key={house.id}
                className="bg-primary hover:bg-primary/90 text-white text-xs sm:text-sm"
                onClick={() => router.push(`/properties/${house.id}`)}
              >
                {t("view")} {house.title}
              </Button>
            ))}
          </div>
        </TabsContent>
      </Tabs>

    </div>
  );
};

export default ComparisonPage;
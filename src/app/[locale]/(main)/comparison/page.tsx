/* eslint-disable */
"use client";
// Next & React
import { useRouter, useSearchParams } from "next/navigation";

// Dependencies
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { FaBath, FaBed, FaCar, FaUser } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";

// Third party components
import Button from "@/components/common/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatNumber } from "@/utils/helper/format-number";

// Types

// Hook & API
import getHousesComparisonByIds from "@/utils/service/comparison/get";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import LoadingCustomized from "@/components/common/loading";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setComparisonIds } from "@/utils/hooks/react-redux/store/slices/comparison";
import Image from "next/image";
import NoImage from "@/assets/images/no.jpg";
import { HouseItemsInterface } from "@/types/house";

/**
 * About us page - Display team members, missions, location and FAQ
 *
 * @page
 * @route /about-us
 *
 */

const ComparisonPage = () => {
  // Hooks
  const t = useTranslations("Comparison");
  const router = useRouter();
  const locale = useLocale();
  const isRTL = locale === "ar" || locale === "fa";
  const searchParams = useSearchParams();
  const idsParam = searchParams.get("ids");
  const { data: houses }: { data: any } = useQuery({
    queryKey: ["COMPARE_HOUSES"],
    queryFn: () => getHousesComparisonByIds(idsParam),
  });
  // Redux
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setComparisonIds(""));
    };
  });

  if (!houses) return <LoadingCustomized title={t("comparing")} />;

  // Rating
  const renderRating = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className={`text-lg ${i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"}`}
          >
            ★
          </span>
        ))}
        <span className={`text-sm font-medium ${isRTL ? "mr-3" : "ml-3"}`}>
          {rating.toFixed(1)}
        </span>
      </div>
    );
  };

  return (
    <div
      dir={isRTL ? "rtl" : "ltr"}
      className="container px-6 md:px-0 lg:px-28 mx-auto py-8 sm:py-12"
    >
      {/* Title and subtitle */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8 sm:mb-12"
      >
        <h1 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-blue-600 to-indigo-800 bg-clip-text text-transparent">
          {t("title")}
        </h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-sm sm:text-base">
          {t("subtitle")}
        </p>
      </motion.div>

      {/* Tabs section */}
      <Tabs defaultValue="visual" className="w-full mb-8 sm:mb-12">
        <TabsList className="grid w-full max-w-xs sm:max-w-md mx-auto grid-cols-2 bg-blue-50 dark:bg-gray-800 min-h-[48px]">
          <TabsTrigger
            value="visual"
            className="data-[state=active]:bg-primary cursor-pointer data-[state=active]:text-white py-3 text-center"
          >
            {t("visualComparison")}
          </TabsTrigger>
          <TabsTrigger
            value="table"
            className="data-[state=active]:bg-primary  cursor-pointer data-[state=active]:text-white py-3 text-center"
          >
            {t("tableComparison")}
          </TabsTrigger>
        </TabsList>
        {/* Compare virtually */}
        <TabsContent value="visual" className="mt-4 sm:mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {houses?.map((house: HouseItemsInterface, index: number) => (
              <motion.div
                dir={isRTL ? "rtl" : "ltr"}
                key={house.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <Card className="overflow-hidden h-full rounded-xl border border-border transition-all duration-300 bg-background">
                  <div className="relative h-52 sm:h-64 w-full">
                    <Image
                      unoptimized
                      fill
                      src={house.photos ? house.photos[0] : NoImage}
                      alt={house.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div
                      className={`absolute top-4 ${isRTL ? "left-4" : "right-4"} flex gap-8`}
                    >
                      <Badge className="bg-primary text-white transition-colors">
                        {renderRating(Number(house.rate))}
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-5 sm:p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h2 className="text-xl sm:text-2xl font-bold mb-2 text-gray-800 dark:text-white line-clamp-1">
                          {house.title}
                        </h2>
                        <div className="flex items-center text-gray-600 dark:text-gray-300">
                          <MdLocationOn
                            className={`text-blue-600 ${isRTL ? "ml-1" : "mr-1"} text-lg`}
                          />
                          <span className="text-xs sm:text-sm line-clamp-1">
                            {house.address}
                          </span>
                        </div>
                      </div>
                      <div className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
                        {formatNumber(Number(house.price))} {t("tooman")}
                      </div>
                    </div>

                    <Separator className="my-4 bg-blue-100 dark:bg-blue-900" />

                    <div className="grid grid-cols-3 gap-y-4 mb-6">
                      <div className="flex items-center">
                        <div
                          className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center ${isRTL ? "ml-2 sm:ml-3" : "mr-2 sm:mr-3"}`}
                        >
                          <FaBed className="text-blue-600 dark:text-blue-400 text-sm sm:text-base" />
                        </div>
                        <div>
                          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                            {t("bedrooms")}
                          </p>
                          <p className="font-medium text-sm sm:text-base">
                            {house.rooms}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center">
                        <div
                          className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center ${isRTL ? "ml-2 sm:ml-3" : "mr-2 sm:mr-3"}`}
                        >
                          <FaBath className="text-blue-600 dark:text-blue-400 text-sm sm:text-base" />
                        </div>
                        <div>
                          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                            {t("bathrooms")}
                          </p>
                          <p className="font-medium text-sm sm:text-base">
                            {house.bathrooms}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div
                          className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center ${isRTL ? "ml-2 sm:ml-3" : "mr-2 sm:mr-3"}`}
                        >
                          <FaCar className="text-blue-600 dark:text-blue-400 text-sm sm:text-base" />
                        </div>
                        <div>
                          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                            {t("parking")}
                          </p>
                          <p className="font-medium text-sm sm:text-base">
                            {house.parking}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center my-auto text-gray-600 dark:text-gray-300">
                        <FaUser
                          className={`text-blue-600 dark:text-blue-400 ${isRTL ? "ml-2" : "mr-2"} text-sm sm:text-base`}
                        />
                        <span className="text-xs sm:text-sm">
                          {house.sellerName}
                        </span>
                      </div>

                      <Button
                        className="py-6 !w-auto text-white text-xs sm:text-sm transition-all cursor-pointer duration-300 shadow-md hover:shadow-lg"
                        handleClick={() =>
                          router.push(`/property-detail/${house.id}`)
                        }
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
        {/* Table compare */}
        <TabsContent
          dir={isRTL ? "rtl" : "ltr"}
          value="table"
          className="mt-4 sm:mt-6"
        >
          <Card className="border-0 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-primary/10">
                    <th
                      className={`p-3 sm:p-4 text-xs sm:text-sm ${isRTL ? "" : ""}`}
                    >
                      {t("specifications")}
                    </th>
                    {houses.map((house) => (
                      <th
                        key={house.id}
                        className="p-3 sm:p-4 text-center text-xs sm:text-sm"
                      >
                        {house.title}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <td className="p-3 sm:p-4 font-medium text-xs sm:text-sm">
                      {t("image")}
                    </td>
                    {houses.map((house) => (
                      <td key={house.id} className="p-3 sm:p-4 text-center">
                        <div className="relative h-16 sm:h-24 w-24 sm:w-32 mx-auto rounded-lg overflow-hidden">
                          <Image
                            src={house.photos ? house.photos[0] : NoImage}
                            alt={house.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/30">
                    <td
                      className={`p-3 sm:p-4 font-medium text-xs sm:text-sm `}
                    >
                      {t("price")}
                    </td>
                    {houses.map((house) => (
                      <td
                        key={house.id}
                        className="p-3 sm:p-4 text-center text-xs sm:text-sm"
                      >
                        {house.price} {t("tooman")}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <td className="p-3 sm:p-4 font-medium text-xs sm:text-sm">
                      {t("location")}
                    </td>
                    {houses.map((house) => (
                      <td
                        key={house.id}
                        className="p-3 sm:p-4 text-center text-xs sm:text-sm"
                      >
                        {house.address}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/30">
                    <td className="p-3 sm:p-4 font-medium text-xs sm:text-sm">
                      {t("bedrooms")}
                    </td>
                    {houses.map((house) => (
                      <td
                        key={house.id}
                        className="p-3 sm:p-4 text-center text-xs sm:text-sm"
                      >
                        {house.rooms}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <td className="p-3 sm:p-4 font-medium text-xs sm:text-sm">
                      {t("bathrooms")}
                    </td>
                    {houses.map((house) => (
                      <td
                        key={house.id}
                        className="p-3 sm:p-4 text-center text-xs sm:text-sm"
                      >
                        {house.bathrooms}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <td className="p-3 sm:p-4 font-medium text-xs sm:text-sm">
                      {t("parking")}
                    </td>
                    {houses.map((house) => (
                      <td
                        key={house.id}
                        className="p-3 sm:p-4 text-center text-xs sm:text-sm"
                      >
                        {house.parking}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 sm:p-4 font-medium text-xs sm:text-sm">
                      {t("agent")}
                    </td>
                    {houses.map((house) => (
                      <td
                        key={house.id}
                        className="p-3 sm:p-4 text-center text-xs sm:text-sm"
                      >
                        {house.sellerName}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>

          <div className="flex flex-wrap justify-center mt-4 sm:mt-6 gap-2 sm:gap-4">
            {houses.map((house) => (
              <Link key={house.id} href={`/property-detail/${house.id}`}>
                <Button className="bg-primary !w-auto cursor-pointer hover:bg-primary/90 text-white text-xs sm:text-sm">
                  {t("view")} {house.title}
                </Button>
              </Link>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ComparisonPage;

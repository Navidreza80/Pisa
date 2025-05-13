"use client"

import Reveal from "@/components/common/reveal";
import MapSVG from "@/components/common/svg/map";
import StarSVG from "@/components/common/svg/starSVG";
import { formatNumber } from "@/utils/helper/format-number";
import { useTranslations } from "next-intl";
import Image from 'next/image';
import { useState } from "react";

const toursData = [
    {
        id: 1,
        name: "تور سالار دره",
        imageSrc: "https://cdn-a-hid.flytoday.ir/upload/hotelimagesdomestic/780/main.jpg",
        address: "ساری، سالار دره",
        price: "2000000",
        rating: 5,
        features: ["ناهار و شام", "2 شب", "راهنمای تور"],
    },
    {
        id: 2,
        name: "تور سالار دره",
        imageSrc: "https://cdn-a-hid.flytoday.ir/upload/hotelimagesdomestic/780/main.jpg",
        address: "ساری، سالار دره",
        price: "2000000",
        rating: 5,
        features: ["ناهار و شام", "2 شب", "راهنمای تور"],
    },
    {
        id: 3,
        name: "تور سالار دره",
        imageSrc: "https://cdn-a-hid.flytoday.ir/upload/hotelimagesdomestic/780/main.jpg",
        address: "ساری، سالار دره",
        price: "2000000",
        rating: 5,
        features: ["ناهار و شام", "2 شب", "راهنمای تور"],
    },
    {
        id: 4,
        name: "تور سالار دره",
        imageSrc: "https://cdn-a-hid.flytoday.ir/upload/hotelimagesdomestic/780/main.jpg",
        address: "ساری، سالار دره",
        price: "2000000",
        rating: 5,
        features: ["ناهار و شام", "2 شب", "راهنمای تور"],
    },
    {
        id: 5,
        name: "تور سالار دره",
        imageSrc: "https://cdn-a-hid.flytoday.ir/upload/hotelimagesdomestic/780/main.jpg",
        address: "ساری، سالار دره",
        price: "2000000",
        rating: 5,
        features: ["ناهار و شام", "2 شب", "راهنمای تور"],
    },
    {
        id: 6,
        name: "تور سالار دره",
        imageSrc: "https://cdn-a-hid.flytoday.ir/upload/hotelimagesdomestic/780/main.jpg",
        address: "ساری، سالار دره",
        price: "2000000",
        rating: 5,
        features: ["ناهار و شام", "2 شب", "راهنمای تور"],
    },
];

 function ToursPage() {
    const t = useTranslations("Tours");
    const tFilter = useTranslations("rent");
    const filtersItems = [
        { text: tFilter("mostExpensive"), value: "price", order: "DESC" },
        { text: tFilter("cheapest"), value: "price", order: "ASC" },
        { text: tFilter("mostPopular"), value: "rate", order: "DESC" },
        { text: tFilter("all"), value: null, order: null },
    ];

    const [selectedFilter, setSelectedFilter] = useState(tFilter("all"));


    return (
        <div dir='rtl' className='px-20 pt-10'>
            <div>
                <Reveal>
                    <div className="text-right text-text text-[36px] font-[700]">
                        {t("TourPageTitle")}
                    </div>
                </Reveal>
                <div className="flex gap-4 my-8 h-12">
                    <div className="h-[48px] w-[396px] relative">
                        <input
                            type="text"
                            placeholder={t("search")}
                            className="w-full h-full border border-gray-300 rounded-[16px] p-4 pr-[48px] text-sm outline-none placeholder:text-[#A6A6A6]"
                        />
                        <svg
                            className="absolute top-[12px] right-[12px]"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M2.5 9H6.5"
                                stroke="#586CFF"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M2.5 14H6.5"
                                stroke="#586CFF"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M2.5 4H18.5"
                                stroke="#586CFF"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M18.5355 17.0355L21.5 20M20 13.5C20 10.7386 17.7614 8.5 15 8.5C12.2386 8.5 10 10.7386 10 13.5C10 16.2614 12.2386 18.5 15 18.5C17.7614 18.5 20 16.2614 20 13.5Z"
                                stroke="#586CFF"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                    <div className="h-[36px] w-[1px] my-auto bg-[#eaeaea]" ></div>
                    {filtersItems.map((item) => (
                        <button
                            key={item.text}
                            onClick={() => {
                                setSelectedFilter(item.text);
                            }}
                            className={`px-4 py-3.5 h-12 flex items-center text-center rounded-[16px] border text-[16px] transition cursor-pointer
                            ${selectedFilter === item.text
                                    ? "bg-[#586CFF] text-white"
                                    : "bg-white text-[#272727] border-[#EAEAEA] border-[1.5px]"
                                }
                                `}
                        >
                            {item.text}
                        </button>
                    ))}
                </div>
            </div>
            <div className="flex flex-wrap gap-6 justify-center p-4">
                {toursData.map((tour) => (
                    <div
                        key={tour.id}
                        className="flex-1 bg-surface h-[420px] transition-transform duration-300 cursor-pointer border-[1px] border-border p-[17px] rounded-[24px] max-w-[403px] lg:min-w-[389px] md:min-w-[389px] hover:shadow-lg"
                    >
                        <div className="w-full h-[188px] rounded-t-[24px] rounded-b-[16px] overflow-hidden bg-gray-200 relative">
                            <Image
                                src={tour.imageSrc}
                                alt={tour.name}
                                width={366}
                                height={188}
                                className="object-cover w-full h-full transition-all duration-500 ease-in-out hover:scale-110 hover:opacity-80"
                                priority
                            />
                        </div>

                        <div className="mt-3 flex justify-between items-start">
                            <h1 className="text-2xl font-bold">{tour.name}</h1>
                            <div className="flex justify-between gap-2">
                                <h1 className="text-[#595959] font-medium text-[12px] my-auto">({tour.rating})</h1>
                                <div className=" bg-white/80 rounded-full flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <StarSVG
                                            key={i}
                                            color={i < tour.rating ? "#FFD700" : "#D1D1D1"}
                                            size={20}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-2 mt-2 items-center">
                            <MapSVG color="#595959" />
                            <h1 className="text-[14px] font-medium text-[#595959]">{tour.address}</h1>
                        </div>

                        <div className="flex gap-2 mt-3">
                            <div className="flex gap-2 mt-3 flex-wrap">
                                {tour.features.map((feature, index) => (
                                    <div
                                        key={index}
                                        className="px-3 py-1 bg-[#F5F5F5] rounded-full text-[12px] text-[#595959]"
                                    >
                                        {feature}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="h-[1px] my-[14px] w-full bg-[#eaeaea]"></div>

                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-[#A6A6A6] text-sm">شروع قیمت از:</p>
                                <p className="text-[#586CFF] font-bold">{formatNumber(Number(tour.price))} تومان</p>
                            </div>
                            <button className="w-[69px] mt-4 h-[30px] bg-[#586CFF] hover:bg-[#4758d6] transition-colors rounded-[10px]">
                                <h1 className="m-auto cursor-pointer text-[12px] font-medium text-white ">
                                    رزرو کنید
                                </h1>
                            </button>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
}

export default ToursPage;
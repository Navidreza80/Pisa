import { FilterModal } from "@/components/common/house/filter-reserve";
import SearchSVG from "@/components/common/svg/search";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  FaStar,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaPhone,
  FaBuilding,
} from "react-icons/fa";

function Page() {
  const estateData = [
    {
      id: 1,
      title: "اکبری",
      address: "گرگان",
      science: "تاسیس ۱۳۹۲",
      image:
        "https://tooopiran.ir/wp-content/uploads/2022/05/%D8%A7%D9%85%D9%84%D8%A7%DA%A9.jpg",
      rating: 4.5,
      phone: "017-12345678",
      properties: "ویلا، آپارتمان، زمین",
      agent: "علیرضا اکبری",
    },
    {
      id: 2,
      title: "۴۰۴",
      address: "تهران",
      science: "تاسیس ۱۴۰۰",
      image:
        "https://tooopiran.ir/wp-content/uploads/2022/05/%D8%A7%D9%85%D9%84%D8%A7%DA%A9.jpg",
      rating: 3.8,
      phone: "011-87654321",
      properties: "آپارتمان، مغازه",
      agent: "محمد فلاح",
    },
    {
      id: 3,
      title: "فلاح",
      address: "ساری",
      science: "تاسیس ۱۳۹۸",
      image:
        "https://tooopiran.ir/wp-content/uploads/2022/05/%D8%A7%D9%85%D9%84%D8%A7%DA%A9.jpg",
      rating: 4.2,
      phone: "011-23456789",
      properties: "ویلا، باغ",
      agent: "رضا کلانتری",
    },
  ];

  const StarRating = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={`full-${i}`} className="text-primary" />
        ))}
        {hasHalfStar && (
          <FaStar key="half" className="text-primary opacity-50" />
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <FaStar key={`empty-${i}`} className="text-[#898989]" />
        ))}
        <span className="mr-1 text-sm text-text-secondary">
          ({rating.toFixed(1)})
        </span>
      </div>
    );
  };

  return (
    <div className="lg:h-[calc(100vh-80px)] md:h-auto h-auto w-full pr-10 flex mx-auto md:mx-auto lg:mx-0 justify-center lg:justify-start md:justify-center lg:flex-nowrap md:flex-wrap flex-wrap">
      <div className="w-[50%] bg-red-600"></div>
      <div dir="rtl">
        <div className="h-[62px] w-full pb-6 lg:pl-7 md:pl-0 pl-0 flex gap-4">
          <div className="relative w-[calc(100%-242px)]">
            <input
              className="h-12 border rounded-2xl border-border px-4 py-3 w-full pr-16"
              dir="rtl"
              placeholder="جستجو کنید ..."
            />
            <span className="absolute right-6 top-3.5">
              <SearchSVG />
            </span>
          </div>
          <div className="flex items-center justify-center gap-1 text-sm font-medium border-border rounded-2xl border px-2 h-12">
            تعداد آگهی: {estateData?.length}
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_1_1499)">
                <path
                  d="M11.3333 0C11.1565 0 10.987 0.0702379 10.8619 0.195262C10.7369 0.320286 10.6667 0.489856 10.6667 0.666667C10.6667 2.63267 8.94467 3.33333 7.33333 3.33333H2.66667C1.95942 3.33333 1.28115 3.61428 0.781049 4.11438C0.280952 4.61448 0 5.29276 0 6L0 7.33333C0.00145611 7.73249 0.0929745 8.12618 0.267735 8.48505C0.442496 8.84392 0.695992 9.15872 1.00933 9.406L3.39067 14.7207C3.56003 15.1014 3.83612 15.4249 4.18551 15.6519C4.53491 15.879 4.94264 15.9999 5.35933 16C5.69087 15.9998 6.0171 15.9167 6.30831 15.7582C6.59952 15.5997 6.84648 15.3709 7.0267 15.0926C7.20692 14.8144 7.31468 14.4954 7.34017 14.1649C7.36567 13.8343 7.30809 13.5026 7.17267 13.2L5.706 10H7.33333C8.94467 10 10.6667 10.7007 10.6667 12.6667C10.6667 12.8435 10.7369 13.013 10.8619 13.1381C10.987 13.2631 11.1565 13.3333 11.3333 13.3333C11.5101 13.3333 11.6797 13.2631 11.8047 13.1381C11.9298 13.013 12 12.8435 12 12.6667V0.666667C12 0.489856 11.9298 0.320286 11.8047 0.195262C11.6797 0.0702379 11.5101 0 11.3333 0ZM5.958 13.746C6.00216 13.8457 6.02073 13.9549 6.01203 14.0636C6.00333 14.1723 5.96764 14.2771 5.90818 14.3686C5.84873 14.46 5.76739 14.5352 5.67155 14.5872C5.57571 14.6393 5.4684 14.6666 5.35933 14.6667C5.20026 14.6666 5.04465 14.6203 4.91139 14.5334C4.77813 14.4465 4.67297 14.3228 4.60867 14.1773L2.73667 10H4.23933L5.958 13.746ZM10.6667 9.73333C9.7142 8.99946 8.53491 8.62209 7.33333 8.66667H2.66667C2.31305 8.66667 1.97391 8.52619 1.72386 8.27614C1.47381 8.02609 1.33333 7.68696 1.33333 7.33333V6C1.33333 5.64638 1.47381 5.30724 1.72386 5.05719C1.97391 4.80714 2.31305 4.66667 2.66667 4.66667H7.33333C8.5345 4.7122 9.71375 4.33602 10.6667 3.60333V9.73333ZM15.9333 10.3013C15.8942 10.3797 15.8401 10.4496 15.7739 10.5071C15.7078 10.5645 15.631 10.6083 15.5479 10.6361C15.4648 10.6638 15.3771 10.6749 15.2897 10.6687C15.2023 10.6625 15.117 10.6392 15.0387 10.6L13.7053 9.93333C13.5471 9.8543 13.4267 9.71564 13.3707 9.54786C13.3147 9.38007 13.3276 9.19691 13.4067 9.03867C13.4857 8.88042 13.6244 8.76005 13.7921 8.70404C13.9599 8.64803 14.1431 8.66097 14.3013 8.74L15.6347 9.40667C15.7921 9.48565 15.9119 9.62373 15.9678 9.79073C16.0238 9.95774 16.0114 10.1401 15.9333 10.298V10.3013ZM13.4067 4.30133C13.3675 4.22299 13.3441 4.13769 13.338 4.05031C13.3318 3.96293 13.3429 3.8752 13.3706 3.79211C13.3983 3.70902 13.4422 3.63221 13.4996 3.56608C13.557 3.49994 13.627 3.44577 13.7053 3.40667L15.0387 2.74C15.1969 2.66097 15.3801 2.64803 15.5479 2.70404C15.7156 2.76005 15.8543 2.88042 15.9333 3.03867C16.0124 3.19691 16.0253 3.38007 15.9693 3.54786C15.9133 3.71564 15.7929 3.8543 15.6347 3.93333L14.3013 4.6C14.223 4.63917 14.1377 4.66252 14.0503 4.66871C13.9629 4.6749 13.8752 4.6638 13.7921 4.63607C13.709 4.60833 13.6322 4.56449 13.5661 4.50706C13.4999 4.44962 13.4458 4.37971 13.4067 4.30133ZM13.3333 6.66667C13.3333 6.48986 13.4036 6.32029 13.5286 6.19526C13.6536 6.07024 13.8232 6 14 6H15.3333C15.5101 6 15.6797 6.07024 15.8047 6.19526C15.9298 6.32029 16 6.48986 16 6.66667C16 6.84348 15.9298 7.01305 15.8047 7.13807C15.6797 7.2631 15.5101 7.33333 15.3333 7.33333H14C13.8232 7.33333 13.6536 7.2631 13.5286 7.13807C13.4036 7.01305 13.3333 6.84348 13.3333 6.66667Z"
                  fill="black"
                />
              </g>
              <defs>
                <clipPath id="clip0_1_1499">
                  <rect width="16" height="16" fill="black" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <FilterModal />
        </div>
        <div className="lg:overflow-y-scroll px-10 md:overflow-y-auto overflow-y-auto w-full lg:pl-[22px] md:pl-0 pl-0 custom-scrollbar lg:max-h-[calc(100vh-142px)] md:h-auto h-auto flex flex-wrap md:justify-center justify-center gap-6">
          {estateData.map((estate) => (
            <Link href={`/realestate/${estate.id}`} className="text-primary">
              <div
                key={estate.id}
                className="p-3 bg-background w-75 min-w-[350px] rounded-xl overflow-hidden transition-shadow duration-300 border border-border"
              >
                <div className="relative h-48">
                  <Image
                    src={estate.image}
                    alt={estate.title}
                    layout="fill"
                    objectFit="cover"
                    className="w-full h-full rounded-2xl"
                  />
                </div>

                <div className="mt-5">
                  <div className="flex justify-between items-start mb-3">
                    <h2 className="text-xl font-bold text-text">
                      املاک {estate.title}
                    </h2>
                    <StarRating rating={estate.rating} />
                  </div>

                  <div className="h-[1px] w-full bg-border my-2" />

                  <div className="flex justify-between text-text-secondary">
                    <div className="flex items-center">
                      <FaBuilding className="ml-2 text-primary" />
                      <span>{estate.agent}</span>
                    </div>

                    <div className="flex items-center">
                      <FaMapMarkerAlt className="ml-2 text-primary" />
                      <span>{estate.address}</span>
                    </div>

                    <div className="flex items-center">
                      <FaCalendarAlt className="ml-2 text-primary" />
                      <span>{estate.science}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Page;

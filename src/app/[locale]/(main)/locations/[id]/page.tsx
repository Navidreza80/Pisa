// Next
import Image from "next/image";

// Third party components
import MainImages from "@/components/single-house/main-images";
import Map from "@/components/single-location-container/map";

// Server actions
import { getCityById } from "@/lib/actions/cities";

// Types
import type PageProps from "@/types";

// Style
import "leaflet/dist/leaflet.css";

/**
 * location detail page - Displays detail of specific
 *
 * @page
 * @route /locations/[id]
 *
 * Features:
 * - Photo gallery section
 * - Landscapes location section
 *
 */

async function page({ params }: PageProps) {
  // Get page ID from params
  const { id } = await params;

  // Fetch city detail
  let cityDetail;
  if (typeof id == "string") cityDetail = await getCityById(id);

  return (
    <div dir="rtl" className="px-[104] pt-[10px]">
      <div className="flex justify-between w-full">
        {/* Image gallery section */}
        <div className="w-[49.06731%] flex flex-col flex-wrap gap-[60px]">
          <div>
            <h1 className="mt-[52px] text-[32px] font-bold">
            مقاصد دیدنی {cityDetail?.cityName}
          </h1>
          </div>
          <div className="mb-[65px]">
            <MainImages
              show3D={false}
              photos={cityDetail?.galleryPhotos}
              sticky={false}
            />
          </div>
          <div className="sticky top-10 ">
            <h1 className="mb-[18px]  font-medium text-[16px] text-[#586CFF]">
              موقعیت مکانی
            </h1>
            <div className="h-[350px] text-white m-auto">
              <Map
                location={cityDetail?.location}
                landscape={cityDetail?.landscapes}
              />
            </div>
          </div>
        </div>
        <div className="w-[48.1751%]">
          {/* Main Image section */}
          <Image
            className="rounded-2xl w-full h-[412px] mt-[120px]"
            width={632}
            height={412}
            src={cityDetail?.mainImage}
            unoptimized
            alt=""
          />
          {/* City name and description */}
          <h1 className="mt-[52px] text-[32px] font-bold">
            مقاصد دیدنی {cityDetail?.cityName}
          </h1>
          <h1 className="mt-[52px] text-[16px] font-medium">
            {cityDetail?.description}
          </h1>
          {/* Landscapes section */}
          {cityDetail?.landscapes.map((landscape) => (
            <div key={landscape.id} className="mb-12">
              <h1 className="mt-[52px] text-[32px] font-bold text-right">
                {landscape.name}
              </h1>

              <div className="relative w-full h-[412px] rounded-2xl overflow-hidden mt-4">
                <Image
                  src={landscape.image}
                  alt={landscape.name}
                  layout="fill"
                  objectFit="cover"
                  quality={75}
                  className="rounded-2xl"
                />
              </div>

              <p className="mt-[52px] text-[16px] font-medium text-right leading-8">
                {landscape.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default page;

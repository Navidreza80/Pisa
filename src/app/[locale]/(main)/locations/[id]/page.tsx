import MainImages from "@/components/single-house/main-images";
import Map from "@/components/single-location-container/map";
import { getCityById } from "@/lib/actions/cities";
import "leaflet/dist/leaflet.css";
import Image from "next/image";

async function page({ params }) {
  const cityDetail = await getCityById(params.id);
  return (
    <div dir="rtl" className="px-[104] pt-[52px]">
      <div className="flex justify-between w-full">
        <div className="w-[49.06731%] flex flex-col flex-wrap gap-[60px]">
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
          <Image
            className="rounded-2xl w-full h-[412px]"
            width={632}
            height={412}
            src={cityDetail?.mainImage}
            unoptimized
            alt=""
          />
          <h1 className="mt-[52px] text-[32px] font-bold">
            مقاصد دیدنی {cityDetail?.cityName}
          </h1>
          <h1 className="mt-[52px] text-[16px] font-medium">
            {cityDetail?.description}
          </h1>

          {cityDetail?.landscapes.map((maghased) => (
            <div key={maghased.id} className="mb-12">
              <h1 className="mt-[52px] text-[32px] font-bold text-right">
                {maghased.name}
              </h1>

              <div className="relative w-full h-[412px] rounded-2xl overflow-hidden mt-4">
                <Image
                  src={maghased.image}
                  alt={maghased.name}
                  layout="fill"
                  objectFit="cover"
                  quality={75}
                  className="rounded-2xl"
                />
              </div>

              <p className="mt-[52px] text-[16px] font-medium text-right leading-8">
                {maghased.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default page;

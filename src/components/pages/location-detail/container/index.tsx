import Map from "../content/MapComponent";
import { getCityById } from "@/lib/actions/cities";
import "leaflet/dist/leaflet.css";
import Image from "next/image";
import MainImages from "../../property-detail/content/MainImages";

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

async function LocationDetailContainer({ id }: { id: string }) {
  // Fetch city detail
  let cityDetail;
  if (typeof id == "string") cityDetail = await getCityById(id);

  return (
    <div dir="rtl" className="px-6 lg:px-[104px] pt-[10px]">
      <div className="flex flex-col lg:flex-row gap-8 w-full">
        {/* Image gallery section */}
        <div className="lg:w-1/2 flex flex-col gap-4">
          <div>
            <h1 className="text-2xl lg:text-4xl font-bold">
              مقاصد دیدنی {cityDetail?.cityName}
            </h1>
          </div>
          <div className="mb-10 flex flex-wrap gap-4">
            {cityDetail?.galleryPhotos && (
              <MainImages
                show3D={false}
                photos={cityDetail?.galleryPhotos}
                sticky={false}
              />
            )}
          </div>
          <div className="lg:sticky md:relative relative lg:py-0 md:py-20 py-20 top-10">
            <h1 className="mb-[18px] text-lg text-primary font-medium">
              موقعیت مکانی
            </h1>
            <div className="h-[350px] text-white m-auto">
              {cityDetail?.location && (
                <Map
                  location={cityDetail?.location}
                  landscapes={cityDetail?.landscapes}
                />
              )}
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="lg:w-1/2">
          {/* Main Image section */}
          {cityDetail?.mainImage && (
            <Image
              className="rounded-2xl w-full h-[300px] lg:h-[412px] mt-4 lg:mt-[100px] object-cover"
              width={632}
              height={412}
              src={cityDetail?.mainImage}
              unoptimized
              alt="City main image"
            />
          )}

          {/* City name and description */}
          <h1 className="mt-6 lg:mt-[52px] text-2xl lg:text-4xl font-bold">
            مقاصد دیدنی {cityDetail?.cityName}
          </h1>
          <p className="mt-4 lg:mt-[52px] text-base lg:text-lg font-medium text-secondary">
            {cityDetail?.description}
          </p>

          {/* Landscapes section */}
          <div className="mt-6 lg:mt-12">
            {cityDetail?.landscapes.map((landscape, index) => (
              <div key={index} className="mb-12">
                <h2 className="text-xl lg:text-2xl font-bold text-right">
                  {landscape.name}
                </h2>

                <div className="relative w-full h-[200px] lg:h-[412px] rounded-2xl overflow-hidden mt-4">
                  <Image
                    src={landscape.image}
                    alt={landscape.name}
                    layout="fill"
                    objectFit="cover"
                    quality={75}
                    className="rounded-2xl"
                  />
                </div>

                <p className="mt-4 lg:mt-[52px] text-base lg:text-lg font-medium text-right text-secondary leading-8">
                  {landscape.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LocationDetailContainer;

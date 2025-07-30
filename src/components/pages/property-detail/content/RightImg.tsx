"use client";

import { useState } from "react";
import VirtualTour from "./VirtualTour";
import Button from "../../../common/button";
import Image from "next/image";
import { useTranslations } from "next-intl";
import NoImage from "@/assets/images/no.jpg";

function RightImg({ photos }: { photos: string[] }) {
  const t = useTranslations("SingleHouse");
  const [show3DTour, setShow3DTour] = useState(false);
  const [current3DImage, setCurrent3DImage] = useState(t("livingRoom"));
  const virtualTours = [
    {
      title: t("livingRoom"),
      url: "https://static.vecteezy.com/system/resources/previews/019/062/597/non_2x/full-spherical-seamless-hdri-360-panorama-in-interior-of-guest-living-room-hall-in-apartment-with-sofa-armchairs-and-dinner-table-in-equirectangular-projection-vr-content-photo.jpg",
    },
    {
      title: t("room"),
      url: "https://static.vecteezy.com/system/resources/previews/022/876/112/non_2x/full-seamless-spherical-hdri-360-panorama-in-interior-of-bedroom-in-studio-apartments-with-arched-access-to-the-balcony-in-equirectangular-projection-vr-content-photo.jpg",
    },
    {
      title: t("bathroom"),
      url: "https://static.vecteezy.com/system/resources/previews/019/924/442/non_2x/white-seamless-360-hdri-panorama-in-interior-of-expensive-bathroom-in-modern-flat-apartments-with-washbasin-in-equirectangular-projection-with-zenith-and-nadir-vr-ar-content-photo.jpg",
    },
    {
      title: t("parking"),
      url: "https://cdn.polyhaven.com/asset_img/primary/parking_garage.png?height=760",
    },
    {
      title: t("yard"),
      url: "https://static.vecteezy.com/system/resources/previews/028/675/380/large_2x/360-hdri-panorama-view-in-garden-with-flower-bed-yard-near-wooden-eco-house-in-village-in-equirectangular-spherical-projection-for-vr-ar-content-photo.jpg",
    },
  ];

  const handle3DImageChange = (title: string) => {
    setCurrent3DImage(title);
  };

  const currentImageUrl =
    virtualTours.find((tour) => tour.title === current3DImage)?.url ||
    virtualTours[0].url;

  return (
    <>
      <Button
        handleClick={() => setShow3DTour(!show3DTour)}
        className=" px-4 py-2 rounded-lg shadow-m  absolute top-2 right-2 transition z-10"
      >
        {show3DTour ? t("showImage") : t("show3D")}
      </Button>

      {show3DTour ? (
        <div className="w-full h-full">
          <VirtualTour img={currentImageUrl} />
          <div className="flex justify-end gap-2 mt-[13px]">
            {virtualTours.map((tour) => (
              <button
                key={tour.title}
                onClick={() => handle3DImageChange(tour.title)}
                className={`bg-white cursor-pointer px-3 py-1 rounded-lg shadow-md hover:bg-gray-100 transition ${
                  current3DImage === tour.title ? "!bg-blue-500 text-white" : ""
                }`}
              >
                {tour.title}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <Image
          height={387}
          unoptimized
          width={1000}
          src={photos[0] || NoImage}
          className="w-full h-[387px] rounded-t-3xl rounded-b-2xl object-cover"
          alt="Property"
        />
      )}
    </>
  );
}

export default RightImg;

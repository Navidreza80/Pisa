"use client";
import { CustomMarker } from "@/components/common/map/custom-map-icon";
import MapComponent from "@/components/common/map/map";
import { RecenterMap } from "@/components/common/map/recenter-map";
import ArrowLeftSVG from "@/components/common/svg/arrow-left";
import MapSVG from "@/components/common/svg/map";
import type { HouseItemsInterface } from "@/types/house";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";

const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});

export default function Map({
  houses,
  currentLoc,
}: {
  houses: HouseItemsInterface[] | undefined;
  currentLoc: [number, number];
}) {
  return (
    <div className="lg:min-w-[45%] animate-jump-in md:w-full lg:border-0 md:border-3 border-3 w-full border-primary lg:aspect-square lg:rounded-none lg:rounded-tr-3xl md:rounded-3xl rounded-3xl lg:!h-[calc(100vh-80px)] h-64 md:h-64 lg:mb-0 md:mb-5 mb-5 overflow-hidden">
      <MapComponent initialLocation={currentLoc} initialZoom={5}>
        {/* Recenter map when the location changes */}
        <RecenterMap center={currentLoc} />
        {/* House markers */}
        {houses?.map((house: HouseItemsInterface, index: number) => {
          const { title, photos, location, price, address } = house;
          return (
            location.lat &&
            location.lng && (
              // Marker
              <CustomMarker
                key={index}
                position={location}
                photoUrl={photos[0]}
              >
                {/* Popup content */}
                <Popup>
                  <div className="popup-content overflow-hidden" >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Image
                          width={50}
                          height={50}
                          src={photos[0]}
                          alt={title}
                          unoptimized
                          className="w-[40px] aspect-square rounded-full"
                        />
                        <span className="font-bold  text-white text-base font-yekan w-auto whitespace-nowrap">
                          {title}
                        </span>
                      </div>
                      <Link
                        href="#"
                        className="!text-white font-yekan flex text-sm mr-[23px] no-underline"
                      >
                        بیشتر
                        <ArrowLeftSVG />
                      </Link>
                    </div>
                    <div className="flex items-center w-2/3 relative right-11 text-white text-sm mb-1 gap-2">
                      <MapSVG size="30" />
                      <span className="truncate font-yekan">{address}</span>
                    </div>
                    <div className="relative right-11 mt-2 font-yekan">
                      <span className="text-white text-base flex items-center gap-2 ">
                        {price?.toLocaleString()}
                        <span className="text-xs">تومان</span>
                      </span>
                    </div>
                  </div>
                </Popup>
              </CustomMarker>
            )
          );
        })}
      </MapComponent>
    </div>
  );
}

"use client";

import { Marker } from "react-leaflet";
import { CustomMarkerIcon } from "@/components/common/map/custom-map-icon";
import MapComponent from "@/components/common/map/map";
import { RealEstate } from "@prisma/client";

export default function MapRealEstates({
  realEstates,
}: {
  realEstates: RealEstate[];
}) {
  return (
    <div className="lg:max-w-[45%] animate-jump-in md:w-full lg:border-0 md:border-3 border-3 w-full border-primary lg:aspect-square lg:rounded-none lg:rounded-tr-3xl md:rounded-3xl rounded-3xl lg:!h-[calc(100vh-80px)] h-64 md:h-64 lg:mb-0 md:mb-5 mb-5 overflow-hidden">
      <MapComponent initialLocation={[35, 52]} initialZoom={5}>
        {/* House markers */}
        {realEstates.map((realEstate: RealEstate, index: number) => {
          const { lat, lng, image } = realEstate;
          return (
            lat &&
            lng && (
              // Marker
              <Marker
                key={index}
                position={[lat, lng]}
                icon={CustomMarkerIcon({ photoUrl: image })}
              ></Marker>
            )
          );
        })}
      </MapComponent>
    </div>
  );
}

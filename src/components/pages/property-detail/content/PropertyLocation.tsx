"use client";
import { CustomMarker } from "@/components/common/map/custom-map-icon";
import MapComponent from "@/components/common/map/map";
import "leaflet/dist/leaflet.css";
import { StaticImageData } from "next/image";

export default function PropertyLocation({
  propertyLocation,
  photoUrl,
}: {
  propertyLocation: [lat: number, lng: number];
  photoUrl: string | StaticImageData;
}) {
  return (
    <MapComponent
      className="rounded-xl"
      initialLocation={propertyLocation}
      initialZoom={13}
    >
      <CustomMarker position={propertyLocation} photoUrl={photoUrl} />
    </MapComponent>
  );
}

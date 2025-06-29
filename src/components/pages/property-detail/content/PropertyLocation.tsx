"use client";
import { CustomMarker } from "@/components/common/map/custom-map-icon";
import MapComponent from "@/components/common/map/map";
import "leaflet/dist/leaflet.css";

export default function PropertyLocation({
  propertyLocation,
  photoUrl,
}: {
  propertyLocation: [lat: number, lng: number];
  photoUrl: string;
}) {
  return (
    <MapComponent className="rounded-xl" initialLocation={propertyLocation} initialZoom={13}>
      <CustomMarker position={propertyLocation} photoUrl={photoUrl} />
    </MapComponent>
  );
}

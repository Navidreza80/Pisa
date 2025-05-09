"use client";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";

export default function PropertyLocation({
  propertyLocation,
}: {
  propertyLocation: [lat: string, lng: string];
}) {
  return (
    <MapContainer
      className="!z-10 h-full w-full rounded-4xl animate-fade-left"
      center={propertyLocation}
      zoom={13}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
}

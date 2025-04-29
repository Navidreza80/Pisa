"use client";

import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { divIcon } from "leaflet";
import "leaflet/dist/leaflet.css";
import MapSVG from "../common/svg/map";
import Link from "next/link";
import ArrowLeftSVG from "../common/svg/arrow-left";
import { useEffect } from "react";

function RecenterMap({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center);
    }
  }, [center, map]);
  return null;
}

export default function Map({ houses, currentLoc }) {
  return (
    <div className="min-w-[45%] aspect-square overflow-hidden">
      <MapContainer
        className="!h-[calc(100vh-80px)] rounded-tr-3xl"
        center={currentLoc}
        zoom={13}
        scrollWheelZoom={false}
      >
        <RecenterMap center={currentLoc} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {houses?.map((house, index) => {
          const customIcon = divIcon({
            className: "custom-marker-icon",
            html: `
              <div class="marker-img-wrapper">
                <img src="${house.photos[0]}" class="marker-img" />
                <div class="marker-pointer"></div>
              </div>
            `,
            iconSize: [48, 60], // Adjusted for pointer
            iconAnchor: [24, 60], // Center bottom
          });
          return (
            <Marker
              key={index}
              position={[house.location.lat, house.location.lng]}
              icon={customIcon}
            >
              <Popup className="custom-leaflet-popup">
                <div className="popup-content overflow-hidden" dir="rtl">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <img
                        src={house.photos[0]}
                        alt={house.title}
                        className="w-[40px] aspect-square rounded-full"
                      />
                      <span className="font-bold font-yekan text-white text-base">
                        {house.title}
                      </span>
                    </div>
                    <Link
                      href="#"
                      className="!text-white font-yekan flex text-sm underline ml-2"
                    >
                      بیشتر
                      <ArrowLeftSVG />
                    </Link>
                  </div>
                  <div className="flex items-center w-2/3 relative right-11 text-white text-sm mb-1 gap-2">
                    <MapSVG />
                    <span className="truncate font-yekan">{house.address}</span>
                  </div>
                  <div className="relative right-11 mt-2">
                    <span className="text-white text-base flex items-center gap-2 font-yekannum">
                      {house.price?.toLocaleString()}
                      <span className="text-xs">تومان</span>
                    </span>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}

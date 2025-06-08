"use client";

import { Landscape } from "@prisma/client";
import { divIcon } from "leaflet";
import { MapContainer, Marker, TileLayer } from "react-leaflet";

interface IProps {
  location: {
    lat: number;
    lng: number;
  };
  landscapes: Landscape[];
}

const Map: React.FC<IProps> = ({ location, landscapes }) => {
  return (
    <MapContainer
      className="!z-10 h-full w-full !rounded-2xl"
      center={[location.lat, location.lng]}
      zoom={12}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {landscapes?.map((item, index) => {
        const customIcon = divIcon({
          className: "custom-marker-icon",
          html: `
                    <div class="marker-img-wrapper">
                      <img src="${item.image}" class="marker-img" />
                      <div class="marker-pointer"></div>
                    </div>
                  `,
          iconSize: [48, 60],
          iconAnchor: [24, 60],
        });
        return (
          <Marker
            key={index}
            position={[Number(item?.lat), Number(item?.lng)]}
            icon={customIcon}
          ></Marker>
        );
      })}
    </MapContainer>
  );
};
export default Map;

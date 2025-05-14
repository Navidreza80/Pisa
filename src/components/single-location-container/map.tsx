"use client";

import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { divIcon } from "leaflet";

const Map = ({ location, landscape }) => {
  console.log(landscape);
  return (
    <MapContainer
      className="!z-10 h-full w-full !rounded-2xl"
      center={[location.lat, location.lng]}
      zoom={10}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* {landscape?.map((item, index) => {
        const customIcon = divIcon({
          className: "custom-marker-icon",
          html: `
                    <div class="marker-img-wrapper">
                      <img src="${item.image[0]}" class="marker-img" />
                      <div class="marker-pointer"></div>
                    </div>
                  `,
          iconSize: [48, 60],
          iconAnchor: [24, 60],
        });
        return (
          <Marker
            key={index}
            position={[item?.lat, item?.lng]}
            icon={customIcon}
          ></Marker>
        );
      })} */}
    </MapContainer>
  );
};
export default Map;

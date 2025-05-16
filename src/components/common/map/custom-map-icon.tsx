// CustomMarkerIcon.tsx
import { divIcon } from "leaflet";
import type { DivIcon } from "leaflet"; // Import the DivIcon type

interface CustomMarkerIconProps {
  photoUrl: string;
}

export const CustomMarkerIcon = ({ photoUrl }: CustomMarkerIconProps): DivIcon => {
  return divIcon({
    className: "custom-marker-icon",
    html: `
      <div class="marker-img-wrapper">
        <img src="${photoUrl}" class="marker-img" />
        <div class="marker-pointer"></div>
      </div>
    `,
    iconSize: [48, 60],
    iconAnchor: [24, 60],
  });
};
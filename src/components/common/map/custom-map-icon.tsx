"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import type { DivIcon, LatLngExpression } from "leaflet";

// Dynamic imports for react-leaflet components
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);

const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});

interface CustomMarkerProps {
  position: LatLngExpression;
  photoUrl?: string;
  children?: React.ReactNode;
}

export const CustomMarker = ({
  position,
  photoUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlLizy-fqB2rnwwBTlPO9bWzjJMTz8qu_meA&s",
  children,
}: CustomMarkerProps) => {
  const [icon, setIcon] = useState<DivIcon | null>(null);

  useEffect(() => {
    let mounted = true;

    const createIcon = async () => {
      try {
        const L = await import("leaflet");
        if (mounted) {
          setIcon(
            L.divIcon({
              className: "custom-marker-icon",
              html: `
                <div class="marker-img-wrapper">
                  <img src="${photoUrl}" class="marker-img" />
                  <div class="marker-pointer"></div>
                </div>
              `,
              iconSize: [48, 60],
              iconAnchor: [24, 60],
            })
          );
        }
      } catch (error) {
        console.error("Failed to create marker icon:", error);
      }
    };

    createIcon();

    return () => {
      mounted = false;
    };
  }, [photoUrl]);

  if (!icon) return null;

  return (
    <Marker position={position} icon={icon}>
      {children && <Popup>{children}</Popup>}
    </Marker>
  );
};

/* eslint-disable */

"use client";

import { useAppSelector } from "@/utils/hooks/react-redux/store/hook";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useMapEvent } from "react-leaflet";

// Dynamically import Leaflet components to prevent SSR
const LazyMapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const LazyTileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);

interface MapComponentProps {
  initialLocation: [number, number];
  initialZoom: number;
  className?: string;
  children?: React.ReactNode;
  onMapClick?: (latlng: any) => void;
}

const MapClickHandler = ({ onClick }: { onClick?: (latlng: any) => void }) => {
  const MapEvents = () => {
    useMapEvent({
      click: (e) => {
        onClick?.(e.latlng);
      },
    });
    return null;
  };
  return <MapEvents />;
};

const MapComponent = ({
  initialLocation,
  initialZoom,
  className,
  children,
  onMapClick,
}: MapComponentProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const theme = useAppSelector((state) => state.theme.theme);

  useEffect(() => {
    setIsMounted(true);
    import("leaflet/dist/leaflet.css");
  }, []);

  const lightProps = {
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  };
  const darkProps = {
    url: "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png",
  };

  if (!isMounted) {
    return (
      <div
        className={`h-full w-full ${className} bg-gray-200 animate-pulse rounded-[14px]`}
      />
    );
  }

  return (
    <LazyMapContainer
      className={`!z-10 h-full w-full ${className}`}
      center={initialLocation}
      zoom={initialZoom}
      scrollWheelZoom={false}
    >
      <LazyTileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url={theme == "light" ? lightProps.url : darkProps.url}
      />
      <MapClickHandler onClick={onMapClick} />
      {children}
    </LazyMapContainer>
  );
};

export default MapComponent;

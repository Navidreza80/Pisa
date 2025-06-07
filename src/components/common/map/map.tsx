import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import { LatLng } from "leaflet";
import { useAppSelector } from "@/utils/hooks/react-redux/store/hook";
import { useEffect } from "react";

interface MapComponentProps {
  initialLocation: [number, number];
  initialZoom: number;
  className?: string;
  children?: React.ReactNode;
  onMapClick?: (latlng: LatLng) => void;
}

// Component to handle map events
const MapClickHandler = ({
  onClick,
}: {
  onClick?: (latlng: LatLng) => void;
}) => {
  useMapEvents({
    click: (e) => {
      onClick?.(e.latlng);
    },
  });
  return null;
};

const MapComponent = ({
  initialLocation,
  initialZoom,
  className,
  children,
  onMapClick,
}: MapComponentProps) => {
  const theme = useAppSelector((state) => state.theme.theme);
  const lightProps = {
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  };
  const darkProps = {
    url: "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png",
  };

  return (
    <>
      {typeof window !== "undefined" && (
        <MapContainer
          className={`!z-10 h-full w-full ${className}`}
          center={initialLocation}
          zoom={initialZoom}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url={theme == "light" ? lightProps.url : darkProps.url}
          />
          <MapClickHandler onClick={onMapClick} />
          {children}
        </MapContainer>
      )}
    </>
  );
};

export default MapComponent;

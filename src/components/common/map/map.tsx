// Dependencies
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";

const MapComponent = ({
  initialLocation,
  initialZoom,
  className,
  children,
}: {
  initialLocation: number[];
  initialZoom: number;
  className?: string;
}) => {
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
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {children}
        </MapContainer>
      )}
    </>
  );
};
export default MapComponent;

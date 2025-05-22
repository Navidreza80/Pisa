// Dependencies
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapComponent = ({ initialLocation, initialZoom, children }) => {
  return (
    <>
      {typeof window !== "undefined" && (
        <MapContainer
          className="!z-10 h-full w-full"
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

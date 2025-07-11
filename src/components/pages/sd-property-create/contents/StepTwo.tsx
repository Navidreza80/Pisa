import InputText from "@/components/common/inputs/text-input-with-label";
import { CustomMarker } from "@/components/common/map/custom-map-icon";
import MapComponent from "@/components/common/map/map";

export default function AddPropertyStepTwo({ formik, setLocation, location }) {
  return (
    <div className="flex flex-col md:flex-row justify-between w-full mt-6 md:mt-[61px] mb-6 md:mb-[51px] h-auto md:h-[366px] gap-4 md:gap-0">
      <div className="w-full md:w-[62.8%] h-[250px] md:h-auto order-2 md:order-1">
        <MapComponent
          className="rounded-[14px] h-full"
          initialLocation={[35.700731157187114, 51.337112334975004]}
          initialZoom={11}
          onMapClick={(location) =>
            setLocation({ lat: location.lat, lng: location.lng })
          }
        >
          {location.lat && location.lng && (
            <CustomMarker position={location}></CustomMarker>
          )}
        </MapComponent>
      </div>
      <div className="w-full md:w-[34.4%] flex flex-col order-1 md:order-2">
        <InputText
          className="text"
          label="نشانی ملک:"
          name="address"
          onChange={formik.handleChange}
        />
        {formik.touched.address && formik.errors.address ? (
          <div className="text-red-500 text-sm mt-1 ">
            {formik.errors.address}
          </div>
        ) : null}
        <h1
          dir="rtl"
          className="leading-8 md:leading-10 text-text text-base md:text-[20px] font-semibold mt-6 md:mt-[68px]"
        >
          با انتخاب موقعیت مکانی ملک خود از روی نقشه به راحتی
          <div className="flex flex-wrap md:flex-nowrap">
            <p className="text-primary"> موقعیت ملک </p>
            <p> راتعیین کنید. </p>
          </div>
        </h1>
      </div>
    </div>
  );
}

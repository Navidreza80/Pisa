import InputText from "@/components/common/inputs/text-input-with-label";
import MapComponent from "@/components/common/map/map";

export default function AddPropertyStepTwo() {
  return (
    <div className="flex justify-between w-full mt-[61px] mb-[51px] h-[366px]">
      <div className="w-[62.8%]">
        <MapComponent
          className="rounded-[14px]"
          initialLocation={[35.700731157187114, 51.337112334975004]}
          initialZoom={11}
        />
      </div>
      <div className="w-[34.4%] flex flex-col">
        <InputText className="text" label="نشانی ملک:" />
        <h1
          dir="rtl"
          className="leading-10 text-text text-[20px] font-semibold mt-[68px]"
        >
          با انتخاب موقعیت مکانی ملک خود از روی نقشه به راحتی
          <div className="flex">
            <p className="text-primary text-nowrap"> موقعیت ملک </p>
            <p className="text-nowrap"> راتعیین کنید. </p>
          </div>
        </h1>
      </div>
    </div>
  );
}

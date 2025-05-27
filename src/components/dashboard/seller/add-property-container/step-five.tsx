import {
  BuildingSVG,
  DollarSVG,
  House2SVG,
  HouseSVG,
  LocationWithOutBorder,
  RentSVG,
  YardSVG,
} from "@/components/svg";

const AddPropertyStepFive = () => {
  const facilities = [
    {
      text: "خیابان ولیعصر، تهران، منطقه مرکزی",
      svg: <LocationWithOutBorder />,
    },
    {
      text: "2 خوابه ، 2 حمامه  ، 1 پارکینگ ، ظرفیت 6 نفر",
      svg: <HouseSVG />,
    },
    { text: "حیاط بالکنی", svg: <YardSVG /> },
    { text: "رهن ، اجاره", svg: <RentSVG /> },
  ];
  const facilities2 = [
    { text: "برچسب ها :", items: ["آپارتمان", "مسکونی", "بالکن"] },
    { text: "مسکونی", svg: <BuildingSVG /> },
    { text: "آپارتمانی", svg: <House2SVG /> },
    { text: " 750,000,000", svg: <DollarSVG /> },
  ];
  return (
    <div className="w-full border border-border flex-wrap rounded-3xl mt-[24px] gap-y-[28px] p-[13px] flex justify-between flex-row-reverse">
      <div className="w-[41.8%]">
        <div className="h-[226px] bg-fade w-full rounded-xl"></div>
      </div>
      <div className="w-[53.4%]">
        <h1 className="text-2xl font-semibold mb-[18px]">
          آپارتمان لوکس زعفرانیه
        </h1>
        <p className="text-[15px] font-medium text-text-secondary leading-6">
          آپارتمانی دنج و آرام در قلب شهر، جایی که زندگی روزمره راحت و سبک‌تر
          است. فضایی مدرن با طراحی منحصربه‌فرد، یادآور خانه‌های دنج و دل‌نشین.
          محلی برای لحظه‌های خوش، آرامش و شروعی نو در زندگی روزمره‌تان.
          آپارتمانی دنج و آرام در قلب شهر، جایی که زندگی روزمره راحت و سبک‌تر
          است. فضایی مدرن با طراحی منحصربه‌فرد، یادآور خانه‌های دنج و دل‌نشین.
          محلی برای لحظه‌های خوش، آرامش و شروعی نو در زندگی روزمره‌تان.
          آپارتمانی دنج و آرام در قلب شهر، جایی که زندگی روزمره راحت و سبک‌تر
          است. فضایی مدرن با طراحی منحصربه‌فرد، یادآور خانه‌های دنج و دل‌نشین.
          محلی برای لحظه‌های خوش، آرامش و شروعی نو در.
        </p>
      </div>
      <div dir="rtl" className="w-[41.8%] flex flex-col flex-wrap gap-y-[17px]">
        {facilities.map((item, index) => {
          return (
            <div
              key={index}
              className="text-text text-[20px] font-medium flex gap-[19px]"
            >
              {item.svg}
              {item.text}
            </div>
          );
        })}
      </div>
      <div dir="rtl" className="w-[53.4%] flex flex-col flex-wrap gap-y-[17px]">
        {facilities2.map((item, index) => {
          return (
            <div
              key={index}
              className={`${index == 0 ? "text-text-secondary text-base flex-wrap items-center" : " text-text text-[20px] "} font-medium flex gap-[19px]`}
            >
              {item.svg}
              {item.text}
              {index == 0 &&
                item.items?.map((item, index) => {
                  return (
                    <span
                      key={index}
                      className="rounded-xl border bg-primary text-white flex items-center justify-center w-[117px] h-[36px]"
                    >
                      {item}
                    </span>
                  );
                })}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default AddPropertyStepFive;

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
    <div className="w-full border border-border flex-wrap rounded-3xl mt-6 md:mt-[24px] gap-y-4 md:gap-y-[28px] p-3 md:p-[13px] flex flex-col md:flex-row md:justify-between md:flex-row-reverse">
      {/* Image Section */}
      <div className="w-full md:w-[41.8%] order-1 md:order-none">
        <div className="h-[200px] md:h-[226px] bg-fade w-full rounded-xl"></div>
      </div>
      {/* Description Section */}
      <div className="w-full md:w-[53.4%] order-2 md:order-none">
        <h1 className="text-xl md:text-2xl font-semibold mb-3 md:mb-[18px] text-right">
          آپارتمان لوکس زعفرانیه
        </h1>
        <p className="text-sm md:text-[15px] font-medium text-text-secondary leading-relaxed md:leading-6 text-right">
          آپارتمانی دنج و آرام در قلب شهر، جایی که زندگی روزمره راحت و سبک‌تر
          است. فضایی مدرن با طراحی منحصربه‌فرد، یادآور خانه‌های دنج و دل‌نشین.
          محلی برای لحظه‌های خوش، آرامش و شروعی نو در زندگی روزمره‌تان.
        </p>
      </div>
      {/* Facilities Section 1 */}
      <div dir="rtl" className="w-full md:w-[41.8%] flex flex-col flex-wrap gap-y-3 md:gap-y-[17px] order-3 md:order-none mt-4 md:mt-0">
        {facilities.map((item, index) => {
          return (
            <div
              key={index}
              className="text-text text-sm md:text-[20px] font-medium flex items-center gap-2 md:gap-[19px]"
            >
              <div className="flex-shrink-0">{item.svg}</div>
              <span>{item.text}</span>
            </div>
          );
        })}
      </div>
      {/* Facilities Section 2 */}
      <div dir="rtl" className="w-full md:w-[53.4%] flex flex-col flex-wrap gap-y-3 md:gap-y-[17px] order-4 md:order-none mt-4 md:mt-0">
        {facilities2.map((item, index) => {
          return (
            <div
              key={index}
              className={`${
                index === 0
                  ? "text-text-secondary text-xs md:text-base flex-wrap items-center"
                  : "text-text text-sm md:text-[20px] items-center"
              } font-medium flex gap-2 md:gap-[19px]`}
            >
              {item.svg && <div className="flex-shrink-0">{item.svg}</div>}
              <span>{item.text}</span>
              {index === 0 &&
                item.items?.map((tagItem, tagIndex) => {
                  return (
                    <span
                      key={tagIndex}
                      className="rounded-lg md:rounded-xl border bg-primary text-white flex items-center justify-center px-3 py-1 md:w-[117px] md:h-[36px] text-xs md:text-sm"
                    >
                      {tagItem}
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

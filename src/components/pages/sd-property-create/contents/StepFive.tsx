import {
  BuildingSVG,
  DollarSVG,
  House2SVG,
  HouseSVG,
  LocationWithOutBorder,
  RentSVG,
  YardSVG,
} from "@/components/svg";
import { HouseItemsInterface } from "@/types/house";
import { formatNumber } from "@/utils/helper/format-number";
import { getTransactionType } from "@/utils/helper/GetTransactionType";
import { useTranslations } from "next-intl";
import Image from "next/image";

interface IProps {
  createdProperty: HouseItemsInterface | undefined;
}

const AddPropertyStepFive: React.FC<IProps> = ({ createdProperty }) => {
  const t = useTranslations("Dashboard");
  const {
    title,
    capacity,
    rooms,
    bathrooms,
    parking,
    yard_type,
    transaction_type,
    price,
    address,
    caption,
  } = createdProperty;
  const facilities = [
    {
      text: address,
      svg: <LocationWithOutBorder />,
    },
    {
      text: `${rooms} ${t("sleeps")} ، ${bathrooms} ${t("bathrooms")}  ، ${parking} ${t("parking")} ، ${t("capacity")} ${capacity} ${t("person")}`,
      svg: <HouseSVG />,
    },
    { text: `${t("yard")} ${yard_type}`, svg: <YardSVG /> },
    { text: getTransactionType(transaction_type)?.text, svg: <RentSVG /> },
  ];
  const facilities2 = [
    { text: t("tags"), items: createdProperty?.tags },
    { text: t("livable"), svg: <BuildingSVG /> },
    { text: t("apartment"), svg: <House2SVG /> },
    { text: formatNumber(Number(price)), svg: <DollarSVG /> },
  ];
  return (
    <div className="w-full border border-border flex-wrap rounded-3xl mt-6 md:mt-[24px] gap-y-4 md:gap-y-[28px] p-3 md:p-[13px] flex flex-col md:flex-row md:justify-between md:flex-row-reverse">
      {/* Image Section */}
      <div className="w-full md:w-[41.8%] order-1 md:order-none">
        <div className="h-[200px] md:h-[226px] bg-fade w-full rounded-xl" />
      </div>
      {/* Description Section */}
      <div className="w-full md:w-[53.4%] order-2 md:order-none">
        <h1 className="text-xl md:text-2xl font-semibold mb-3 md:mb-[18px] ">
          {title}
        </h1>
        <p className="text-sm md:text-[15px] font-medium text-text-secondary leading-relaxed md:leading-6 ">
          {caption}
        </p>
      </div>
      {/* Facilities Section 1 */}
      <div className="w-full md:w-[41.8%] flex flex-col flex-wrap gap-y-3 md:gap-y-[17px] order-3 md:order-none mt-4 md:mt-0">
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
      <div className="w-full md:w-[53.4%] flex flex-col flex-wrap gap-y-3 md:gap-y-[17px] order-4 md:order-none mt-4 md:mt-0">
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

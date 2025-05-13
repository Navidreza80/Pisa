import { getTranslations } from "next-intl/server";
import InputText from "../common/inputs/text-inputs";
import SectionName from "./section-name";

export default async function ReserveForm() {
  const t = await getTranslations("SingleHouse");
  return (
    <>
      <div className="mt-10 flex flex-col gap-4">
        <SectionName sectionName={t("reserve")} />
        <div className="w-full flex flex-wrap justify-between gap-3">
          <div className="!w-[calc(50%-27px)] flex flex-col gap-y-3">
            <p>{t("dateEnter")}</p> <InputText width="!w-full" />
          </div>
          <div className="!w-[calc(50%-27px)] flex flex-col gap-y-3">
            <p>{t("dateExit")}</p> <InputText width="!w-full" />
          </div>
          <div className="!w-[calc(50%-27px)] flex flex-col gap-y-3">
            <p>{t("capacity")}</p> <InputText width="!w-full" />
          </div>
          <div className="!w-[calc(50%-27px)] flex flex-col gap-y-3">
            <p>{t("discount")}</p> <InputText width="!w-full" />
          </div>
        </div>
      </div>
      {/* Price section */}
      <div className="mt-6 flex gap-4 justify-between flex-wrap">
        {/* Price */}
        <div className="flex flex-col gap-3">
          <h1 className="text-text">قیمت</h1>
          <div className="flex flex-row-reverse gap-[5px]">
            <h1 className="text-[20px] font-[700] my-auto ">
              1500000
            </h1>
            <p className="text-[12px] font-[700] my-auto text-text-secondary ">
              تومان
            </p>
          </div>
        </div>
        {/* Like & share section */}
        <div className="flex gap-6">
          {/* Save */}
          <p className="border-text-secondary border rounded-full w-12 h-12 flex justify-center items-center">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.5 14.5L14.5 9.5"
                stroke="black"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M16.8463 14.6095L19.4558 12C21.5147 9.94112 21.5147 6.60302 19.4558 4.54415C17.397 2.48528 14.0589 2.48528 12 4.54415L9.39045 7.1537M14.6095 16.8463L12 19.4558C9.94113 21.5147 6.60303 21.5147 4.54416 19.4558C2.48528 17.3969 2.48528 14.0588 4.54416 12L7.1537 9.39045"
                stroke="black"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </p>
          {/* Share */}
          <p className="w-12 h-12 bg-primary rounded-full flex justify-center items-center">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 4.5C5.50442 5.70104 3 8.94175 3 12.7511C3 13.9579 3.25134 15.1076 3.70591 16.1534M15 4.5C18.4956 5.70104 21 8.94175 21 12.7511C21 13.7736 20.8195 14.7552 20.4879 15.6674M16.5 20.3296C15.1762 21.074 13.6393 21.5 12 21.5C10.3607 21.5 8.82378 21.074 7.5 20.3296"
                stroke="white"
                strokeWidth="1.5"
              />
              <path
                d="M15 5C15 6.65685 13.6569 8 12 8C10.3431 8 9 6.65685 9 5C9 3.34315 10.3431 2 12 2C13.6569 2 15 3.34315 15 5Z"
                stroke="white"
                strokeWidth="1.5"
              />
              <path
                d="M5 22C6.65685 22 8 20.6569 8 19C8 17.3431 6.65685 16 5 16C3.34315 16 2 17.3431 2 19C2 20.6569 3.34315 22 5 22Z"
                stroke="white"
                strokeWidth="1.5"
              />
              <path
                d="M19 22C20.6569 22 22 20.6569 22 19C22 17.3431 20.6569 16 19 16C17.3431 16 16 17.3431 16 19C16 20.6569 17.3431 22 19 22Z"
                stroke="white"
                strokeWidth="1.5"
              />
            </svg>
          </p>
        </div>
        <button className="bg-primary w-full rounded-full mt-4 h-12 text-white">
          همین الان رزرو کن
        </button>
      </div>
    </>
  );
}

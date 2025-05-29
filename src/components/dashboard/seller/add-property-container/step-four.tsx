"use client";
import { AddSVG, CameraSVG } from "@/components/svg";

const AddPropertyStepFour = () => {
  return (
    <div className="mt-8 flex flex-col justify-center items-center">
      <div className="flex flex-row-reverse justify-start flex-wrap text-[20px] font-bold w-full">
        <h1 className="text-base font-medium mb-[19px] w-full text-text-secondary">
          تصاویر ملک
        </h1>
        <h2 className="text-primary">.یک تصویر بهتر از هزار کلمه</h2>
        <h2 className="text-text font-semibold">
          .با قرار دادن عکس شانس دیده شدن ملک‌تان را ۵ برابر کنید
        </h2>
      </div>
      <div className="mt-[81px] flex flex-wrap gap-[30px]">
        {[1, 2, 3, 4].map((item, index) => {
          return index == 3 ? (
            <div
              key={index}
              className="w-[189px] text-primary relative items-center flex-wrap aspect-square border-dashed border-2 rounded-3xl flex justify-center border-primary"
            >
              <div className="flex flex-wrap justify-center gap-y-[15px]">
                <AddSVG />
                <h1 className="w-full text-center font-bold">افزودن عکس</h1>
              </div>
              <label
                htmlFor={`file${index}`}
                className="absolute w-full h-full cursor-pointer"
              ></label>
              <input
                id={`file${index}`}
                type="file"
                accept="image/*"
                onChange={() => console.log("Hello")}
                className="hidden"
              />
            </div>
          ) : (
            <div
              key={index}
              className="w-[189px] relative aspect-square border-dashed border-2 rounded-3xl flex justify-center items-center border-border"
            >
              <CameraSVG />
              <label
                htmlFor={`file${index}`}
                className="absolute w-full h-full cursor-pointer"
              ></label>
              <input
                id={`file${index}`}
                type="file"
                accept="image/*"
                onChange={() => console.log("Hello")}
                className="hidden"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default AddPropertyStepFour;

"use client";
import { AddSVG, CameraSVG } from "@/components/svg";

const AddTourStepFour = () => {
  return (
    <div className="mt-8 flex flex-col justify-center items-center">
      <div className="flex flex-row-reverse justify-start flex-wrap text-[20px] font-bold w-full">
        <h1 className="text-base font-medium mb-[19px] w-full text-text-secondary">
          تصاویر تور
        </h1>
        <h2 className="text-primary">.یک تصویر بهتر از هزار کلمه</h2>
        <h2 className="text-text font-semibold">
          .با قرار دادن عکس شانس دیده شدن تور تان را ۵ برابر کنید
        </h2>
      </div>
      <div className="mt-[81px] flex flex-wrap gap-[30px]">
        <div className="w-[189px] text-primary relative items-center flex-wrap aspect-square border-dashed border-2 rounded-3xl flex justify-center border-primary">
          <div className="flex flex-wrap justify-center gap-y-[15px]">
            <AddSVG />
            <h1 className="w-full text-center font-bold">افزودن عکس</h1>
          </div>
          <label
            htmlFor="file"
            className="absolute w-full h-full cursor-pointer"
          ></label>
          <input
            id="file"
            type="file"
            accept="image/*"
            onChange={() => console.log("Hello")}
            className="hidden"
          />
        </div>
      </div>
    </div>
  );
};
export default AddTourStepFour;

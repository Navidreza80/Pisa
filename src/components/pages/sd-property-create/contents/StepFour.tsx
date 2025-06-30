"use client";
import InputText from "@/components/common/inputs/text-input-with-label";

const AddPropertyStepFour = ({ photoURL, handleChange }) => {
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
      <div
        dir="rtl"
        className="mt-[81px] grid grid-cols-2 gap-[30px] justify-center"
      >
        {photoURL.map((val, i) => (
          <InputText
            key={i}
            label={`لینک عکس:`}
            value={val}
            onChange={(e) => handleChange(i, e.target.value)}
          />
        ))}
      </div>
    </div>
  );
};
export default AddPropertyStepFour;

"use client";

/**
 * House loading skeleton component for loading statement.
 *
 * @component
 * @returns {JSX.Element} - Rendered filter modal
 */

export default function HouseSkeleton({
  width,
  minWidth,
}: {
  width?: string;
  minWidth?: string;
}) {
  return (
    <div
      className={`flex flex-col flex-wrap overflow-hidden justify-between border ${
        minWidth ? minWidth : "lg:min-w-[391px] md:min-w-[391px] min-w-full"
      } ${
        width ? width : "lg:w-[calc(33.3%-20px)]"
      } p-4 rounded-[40px] gap-[13px] border-border animate-pulse`}
    >
      <div className="overflow-hidden w-full relative h-[221px] rounded-b-[16px] rounded-t-[24px] bg-gray-200" />
      <div className="flex gap-[9px] flex-wrap justify-start">
        <div className="w-2/3 h-6 bg-gray-200 rounded mb-2" />
        <div className="flex justify-end gap-[5px] w-full">
          <div className="flex gap-1.5 w-1/2">
            <div className="w-5 h-5 bg-gray-200 rounded-full" />
            <div className="h-4 w-24 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
      <div className="bg-border h-[1px]" />
      <div className="flex flex-row-reverse justify-between">
        {[...Array(3)].map((_, idx) => (
          <div
            key={idx}
            className="flex flex-row-reverse gap-[5px] items-center"
          >
            <div className="w-5 h-5 bg-gray-200 rounded-full" />
            <div className="flex flex-row-reverse gap-[3px]">
              <div className="w-8 h-4 bg-gray-200 rounded" />
              <div className="w-6 h-4 bg-gray-200 rounded" />
            </div>
          </div>
        ))}
      </div>
      <div dir="rtl" className="flex justify-between">
        <div className="flex gap-1" dir="rtl">
          <div className="flex flex-row-reverse gap-[10px]">
            <div className="relative">
              <div className="flex flex-row-reverse gap-[5px]">
                <div className="w-16 h-6 bg-gray-200 rounded" />
              </div>
            </div>
          </div>
          <div className="w-10 h-4 bg-gray-200 rounded my-auto" />
        </div>
        <div className="w-8 h-8 bg-gray-200 rounded-full" />
      </div>
    </div>
  );
}

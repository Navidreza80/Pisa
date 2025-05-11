import { Comments } from "@/types/comments";
import ArrowSVG from "../common/svg/arrow";

export default async function AllComments({
  propertyComments,
}: {
  propertyComments: Comments[];
}) {

  return (
    <div dir="rtl" className="mt-10 flex gap-y-6 flex-col">
      {/* Comment 1 */}
      {propertyComments.map((comment) => {
        return (
          <div key={comment.id} dir="rtl" className="flex justify-start gap-x-3">
            <div className="h-full">
              {/* Image section */}
              <div
                className="rounded-full bg-gray-500"
                style={{ width: "48px", height: "48px" }}
              />
            </div>
            <div className="flex flex-col">
              <h2 className="text-text">عباس بهبودی</h2>
              <h3
                className="text-text-secondary text-sm "
                dir="rtl"
              >
                15 اردیبهشت 1404
              </h3>
              <p className="mt-3  lg:w-[400px] md:w-[400px] w-[300px] whitespace-nowrap overflow-hidden text-ellipsis">{comment.caption}</p>
              <div className="mt-[13px] flex gap-6">
                <span className=" text-sm text-text-secondary flex gap-1 cursor-pointer">
                  <ArrowSVG /> مشاهده 12 پاسخ
                </span>
                <span className="text-sm text-primary cursor-pointer">پاسخ دادن</span>
              </div>
            </div>
          </div>
        );
      })}
      {/* Comment 2 */}
      <div className="flex justify-end gap-x-3">
        <div className="h-full">
          <div className="w-12 h-12 justify-center items-center flex">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.6665 17.5V15.7692C16.6665 14.1017 16.6665 13.2681 16.5454 12.5705C15.8788 8.73042 12.5777 5.71869 8.36867 5.11049C7.60408 5 5.99415 5 4.1665 5"
                stroke="#586CFF"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5.8335 2.5C5.3278 2.99153 3.3335 4.29977 3.3335 5C3.3335 5.70022 5.3278 7.00847 5.8335 7.5"
                stroke="#586CFF"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        <div className="h-full">
          {/* Image section */}
          <div
            className="!w-12 !h-12 rounded-full bg-gray-500"
            style={{ width: "48px", height: "48px" }}
          />
        </div>
        <div className="flex flex-col">
          <h2 className="text-text">عباس بهبودی</h2>
          <h3 className="text-text-secondary text-sm " dir="rtl">
            15 اردیبهشت 1404
          </h3>
          <p className="mt-3 ">
            راضی نبودم ، چرت محض بود این هتل . 25 موقعیت پنالتی داشتیم نگرفتن
            برامون واقعا این چه وضعشه
          </p>
          <div className="mt-[13px] flex gap-6">
            <span className=" text-sm text-text-secondary flex gap-1">
              <ArrowSVG /> مشاهده 12 پاسخ{" "}
            </span>
            <span className="text-sm text-primary">پاسخ دادن</span>
          </div>
        </div>
      </div>
    </div>
  );
}

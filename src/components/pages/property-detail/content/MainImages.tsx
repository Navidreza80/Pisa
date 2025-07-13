import clsx from "clsx";
import RightImg from "./RightImg";
import Image from "next/image";

export default async function MainImages({
  photos,
  sticky,
}: {
  photos: string[];
  sticky: boolean;
}) {
  return (
    <>
      {/* Right section */}
      <div
        className={clsx(
          "flex gap-4 flex-wrap animate-fade-left md:relative relative lg:top-10 md:top-0 top-0 lg:w-[100%] md:w-full w-full h-[calc(100vh-100px)]",
          {
            "lg:sticky": sticky,
          }
        )}
      >
        <RightImg photos={photos} />
        {/* + n other pictures section */}
        {photos.length > 3 && (
          <div className="lg:w-[calc(33.33333333333333%-10.7px)] md:hidden hidden  text-text border rounded-t-2xl lg:flex justify-center items-center border-border rounded-b-3xl h-[192px]">
            <svg
              width="20"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.50004 5.5C7.50004 5.5 12.5 9.18242 12.5 10.5C12.5 11.8177 7.5 15.5 7.5 15.5"
                stroke="black"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            12+ عکس دیگر
          </div>
        )}
        {photos[1] && (
          <Image
            fill
            alt="image"
            unoptimized
            src={photos[1]}
            className="w-[calc(33.33333333333333%-10.7px)] rounded-t-2xl lg:block md:hidden hidden rounded-b-3xl h-[192px]"
          />
        )}
        {photos[2] && (
          <Image
            fill
            unoptimized
            alt="image"
            src={photos[2]}
            className="w-[calc(33.3333333333333%-10.7px)] rounded-t-2xl lg:block md:hidden hidden rounded-b-3xl h-[192px]"
          />
        )}
      </div>
    </>
  );
}

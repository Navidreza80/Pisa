"use client";

import SectionName from "./SectionName";
import StarRatings from "react-star-ratings";

export default function HouseRate({ rate }: { rate: number }) {
  return (
    <>
      <SectionName sectionName="امتیاز هتل" />
      <div className="flex items-center">
        <StarRatings
          rating={Number(rate)}
          starDimension="40px"
          starSpacing="12px"
          starRatedColor="#586cff"
          starEmptyColor="lightgray"
          numberOfStars={5}
          name="rating"
          allowHalfStar={true}
          isSelectable={false}
        />
        <span className="text-fade">( {rate} )</span>
      </div>
    </>
  );
}

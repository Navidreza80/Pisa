"use client";
import { getAllHouse } from "@/utils/service/house/get-all-house";
import Button from "../common/button/button";
import HouseCardList from "../common/house/HouseCardList";
import SearchSVG from "../common/svg/search";
import Map from "./map";
import "./scrollbar.css";
import { useEffect, useState } from "react";

export default function ReserveContainer() {
  const [currentLoc, setCurrentLoc] = useState([36.570797, 53.058983]);
  const [houses, setHouses] = useState();
  const fetchHouses = async () => {
    const data = await getAllHouse(1, 3, null, null, null, null);
    console.log(data);
    setHouses(data);
  };
  useEffect(() => {
    fetchHouses();
  }, []);

  return (
    <div className="h-[calc(100vh-80px)] w-[calc(100%-7.25%)] flex">
      <Map currentLoc={currentLoc} houses={houses} />
      <div className="flex-grow">
        <div className="h-[62px] w-full pb-6 pl-7 flex gap-4">
          <div className="relative w-[calc(100%-101px)]">
            <input
              className="h-12 border rounded-2xl border-[#EAEAEA] px-4 py-3 w-full pr-16"
              dir="rtl"
              placeholder="جستجو کنید ..."
            />
            <span className="absolute right-6 top-3.5">
              <SearchSVG />
            </span>
          </div>
          <Button className="!w-[85px]">فیلتر ها</Button>
        </div>
        <div
          dir="rtl"
          className="overflow-y-scroll w-full pl-[22px] custom-scrollbar h-[calc(100vh-142px)] flex flex-wrap gap-[24.95px] justify-between"
        >
          {houses?.map((item, index) => {
            return (
              <HouseCardList
                setCurrentLoc={setCurrentLoc}
                showOnMap
                width="w-[calc(50%-24.95px)]"
                minWidth="min-w-[315px]"
                key={index}
                showFacilities={false}
                card={item}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

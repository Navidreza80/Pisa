"use client";
import { getAllHouse } from "@/utils/service/house/get-all-house";
import { getAllLocations } from "@/utils/service/location/location";
import { useEffect, useState } from "react";
import Button from "../common/button/button";
import HouseCardList from "../common/house/HouseCardList";
import InputSelect from "../common/inputs/select-input";
import SearchSVG from "../common/svg/search";
import Map from "./map";
import "./scrollbar.css";
// Add shadcn dialog imports
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function ReserveContainer() {
  const [currentLoc, setCurrentLoc] = useState([36.570797, 53.058983]);
  const [houses, setHouses] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [locations, setLocations] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  // Filter houses based on search query
  const filteredHouses = houses?.filter((house) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      (house.title && house.title.toLowerCase().includes(searchLower)) ||
      (house.address && house.address.toLowerCase().includes(searchLower)) ||
      (house.tags &&
        house.tags.some((tag) => tag.toLowerCase().includes(searchLower)))
    );
  });
  const fetchData = async () => {
    const dataHouses = await getAllHouse(1, 3, null, null, null, null);
    setHouses(dataHouses);
    const dataLocations = await getAllLocations();
    setLocations(dataLocations);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="lg:h-[calc(100vh-80px)] md:h-auto h-auto w-[calc(100%-7.25%)] flex mx-auto md:mx-auto lg:mx-0 justify-center lg:justify-start md:justify-center lg:flex-nowrap md:flex-wrap flex-wrap">
      <Map currentLoc={currentLoc} houses={houses} />
      <div className="flex-grow">
        <div className="h-[62px] w-full pb-6 lg:pl-7 md:pl-0 pl-0 flex gap-4">
          <div className="relative w-[calc(100%-101px)]">
            <input
              className="h-12 border rounded-2xl border-border px-4 py-3 w-full pr-16"
              dir="rtl"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="جستجو کنید ..."
            />
            <span className="absolute right-6 top-3.5">
              <SearchSVG />
            </span>
          </div>
          <Button
            handleClick={() => setIsModalOpen(!isModalOpen)}
            className="!w-[85px]"
          >
            فیلتر ها
          </Button>
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogContent className="!max-w-[310px] z-[1200]">
              <DialogHeader>
                <DialogTitle className="text-base font-yekan"></DialogTitle>
              </DialogHeader>
              <div className="pt-2" dir="rtl">
                <h2 className="pb-3">مقصد هتل شما</h2>
                <InputSelect width={262} items={locations} />
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <div
          dir="rtl"
          className="lg:overflow-y-scroll md:overflow-y-auto overflow-y-auto w-full lg:pl-[22px] md:pl-0 pl-0 custom-scrollbar lg:max-h-[calc(100vh-142px)] md:h-auto h-auto flex flex-wrap gap-[24.95px] lg:justify-between md:justify-center justify-center"
        >
          {filteredHouses &&
            filteredHouses.length > 0 &&
            filteredHouses.map((item, index) => {
              return (
                <HouseCardList
                  setCurrentLoc={setCurrentLoc}
                  showOnMap
                  width="lg:w-[calc(50%-24.95px)] md:w-[calc(50%-10px)] w-full"
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

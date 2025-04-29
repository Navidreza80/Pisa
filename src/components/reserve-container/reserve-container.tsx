import { JwtPayload } from "@/types/user";
import { getAllHouse } from "@/utils/service/house/get-all-house";
import { getServerCookie } from "@/utils/service/storage/server-cookie";
import { jwtDecode } from "jwt-decode";
import Button from "../common/button/button";
import HouseCardList from "../common/house/HouseCardList";
import Map from "./map";
import "./scrollbar.css";
import { Search } from "lucide-react"; // or use any SVG/icon you prefer
import SearchSVG from "../common/svg/search";

export default async function ReserveContainer() {
  const houses = await getAllHouse(1, 3, null, null, null, null);
  const token = await getServerCookie("serverAccessToken");
  const decodedUser =
    typeof token === "string" ? jwtDecode<JwtPayload>(token) : null;
  return (
    <div className="h-[calc(100vh-80px)] w-[calc(100%-7.25%)] flex">
      <Map />
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
          {houses.map((item, index) => {
            return (
              <HouseCardList
                showOnMap
                width="w-[calc(50%-24.95px)]"
                minWidth="min-w-[315px]"
                key={index}
                showFacilities={false}
                card={item}
                userId={decodedUser && decodedUser.id}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

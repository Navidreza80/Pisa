import SearchSVG from "@/components/common/svg/search";
import MapRealEstates from "../content/map";
import RealEstateCard from "../content/cards/RealEstateCard";
import { getRealEstates } from "@/lib/actions/realestate";
import { RealEstate } from "@prisma/client";
import { Megaphone } from "lucide-react";

async function RealEstateList() {
  const estateData: RealEstate[] = await getRealEstates();

  // TODO: Add filter and search

  return (
    <div className="lg:h-[calc(100vh-80px)] md:h-auto h-auto w-[calc(100%-7.25%)] flex mx-auto md:mx-auto lg:mx-0 justify-center lg:justify-start md:justify-center lg:flex-nowrap md:flex-wrap flex-wrap">
      <MapRealEstates realEstates={estateData} />
      <div className="flex-grow animate-fade-left">
        <div className="h-[62px] w-full pb-6 lg:pl-7 md:pl-0 pl-0 flex gap-4">
          <div className="relative w-[calc(100%-242px)]">
            <input
              className="h-12 border rounded-2xl border-border px-4 py-3 w-full pr-16"
              dir="rtl"
              placeholder="جستجو کنید ..."
            />
            <span className="absolute right-6 top-3.5">
              <SearchSVG />
            </span>
          </div>
          <div className="flex items-center justify-center gap-1 text-sm font-medium border-border rounded-2xl border px-2 h-12 whitespace-nowrap">
            تعداد آگهی: {estateData.length}
            <Megaphone />
          </div>
          {/* <FilterModal /> */}
        </div>
        <div
          dir="rtl"
          className="lg:overflow-y-scroll md:overflow-y-auto overflow-y-auto w-full lg:pl-[22px] md:pl-0 pl-0 custom-scrollbar lg:max-h-[calc(100vh-142px)] md:h-auto h-auto flex flex-wrap gap-[24.95px] lg:justify-between md:justify-center justify-center"
        >
          {estateData.map((estate: RealEstate, index: number) => {
            return <RealEstateCard estate={estate} key={index} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default RealEstateList;

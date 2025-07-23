"use client";
import HouseSkeleton from "@/components/common/house/house-skeleton";
import HouseCardList from "@/components/common/house/HouseCardList";
import SearchSVG from "@/components/common/svg/search";
import {
  useAppDispatch,
  useAppSelector,
} from "@/utils/hooks/react-redux/store/hook";
import { setReserveFilters } from "@/utils/hooks/react-redux/store/slices/reserve-slice";
import { useHouses } from "@/utils/hooks/use-houses";
import { Megaphone } from "lucide-react";
import { useState } from "react";
import Map from "../contents/Map";
import { FilterModal } from "../modals/BookingFilterModal";
import "../styles/scrollbar.css";
import { useTranslations } from "next-intl";

export default function ReserveListContainer() {
  const t = useTranslations("Reserve");
  const [currentLoc, setCurrentLoc] = useState<[number, number]>([34, 52]);
  const { data, isLoading } = useHouses();
  const filters = useAppSelector((state) => state.reserveFilters);
  const dispatch = useAppDispatch();

  const handleChange = (name: string, value: string) => {
    dispatch(setReserveFilters({ [name]: value }));
  };

  return (
    <div className="w-full flex justify-end">
      <div className="lg:h-[calc(100vh-80px)] md:h-auto h-auto w-[calc(100%-7.25%)] flex mx-auto md:mx-auto lg:mx-0 justify-center md:justify-center lg:justify-start lg:flex-nowrap md:flex-wrap flex-wrap font-yekan">
        <div className="flex-grow animate-fade-left">
          <div className="h-[62px] w-full pb-6 rtl:lg:pl-7 ltr:lg:pr-7 md:pl-0 pl-0 flex gap-4">
            <FilterModal />
            <div className="flex whitespace-nowrap items-center justify-center gap-1 text-sm font-medium border-border rounded-2xl border px-2 h-12">
              <Megaphone />
              {t("propertiesCount")} {data?.totalCount}
            </div>
            <div className="relative w-[calc(100%-242px)]">
              <input
                value={filters.search || ""}
                onChange={(e) => handleChange("search", e.target.value)}
                className="h-12 border rounded-2xl border-border px-4 py-3 w-full rtl:pr-16 ltr:pl-16"
                placeholder={t("search")}
              />
              <span className="absolute rtl:right-6 ltr:left-6 top-3.5">
                <SearchSVG />
              </span>
            </div>
          </div>
          <div className="lg:overflow-y-scroll md:overflow-y-auto overflow-y-auto w-full rtl:lg:pl-[22px] ltr:pr-[22px] md:pl-0 pl-0 custom-scrollbar lg:max-h-[calc(100vh-142px)] md:h-auto h-auto flex flex-wrap gap-[24.95px] lg:justify-between md:justify-center justify-center">
            {isLoading &&
              [...Array(6)].map((_, i) => (
                <HouseSkeleton
                  width="lg:w-[calc(50%-24.95px)] md:w-[calc(50%-10px)] w-full"
                  minWidth="min-w-[315px]"
                  key={i}
                />
              ))}
            {data?.houses && data?.houses?.length > 0 ? (
              data.houses.map((item, index) => {
                return (
                  <HouseCardList
                    setCurrentLoc={setCurrentLoc}
                    showOnMap
                    width="lg:w-[calc(50%-12.475px)] md:w-[calc(50%-10px)] w-full"
                    minWidth="min-w-[315px]"
                    key={index}
                    showFacilities={false}
                    card={item}
                  />
                );
              })
            ) : (
              <div className="font-bold text-2xl mt-1">{t("noResult")}</div>
            )}
          </div>
        </div>
        <Map currentLoc={currentLoc} houses={data?.houses} />
      </div>
    </div>
  );
}

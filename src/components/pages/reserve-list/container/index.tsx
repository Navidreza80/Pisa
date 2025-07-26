"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
import { Megaphone } from "lucide-react";

import HouseSkeleton from "@/components/common/house/house-skeleton";
import HouseCardList from "@/components/common/house/HouseCardList";
import SearchSVG from "@/components/common/svg/search";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import {
  useAppDispatch,
  useAppSelector,
} from "@/utils/hooks/react-redux/store/hook";
import { setReserveFilters } from "@/utils/hooks/react-redux/store/slices/reserve-slice";
import { useHouses } from "@/utils/hooks/use-houses";
import { useSaveSearch } from "@/utils/service/save-seach/useSaveSearch";

import Map from "../contents/Map";
import SavedSearchList from "../contents/SavedSearchList";
import { FilterModal } from "../modals/BookingFilterModal";
import SaveSearchModal from "../modals/SaveSearchModal";
import "../styles/scrollbar.css";

export default function ReserveListContainer() {
  // Pagination states
  const [page, setPage] = useState(1);
  const pageSize = 10;

  // Translations
  const t = useTranslations("Reserve");

  // Current map location (lat, lng)
  const [currentLoc, setCurrentLoc] = useState<[number, number]>([34, 52]);

  // Redux state & dispatcher
  const filters = useAppSelector((state) => state.reserveFilters);
  const dispatch = useAppDispatch();

  // Custom hooks for data and saving
  const { data, isLoading } = useHouses();
  const { mutate: saveSearchMutation } = useSaveSearch();

  // UI state for dropdown
  const [showSavedSearches, setShowSavedSearches] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalPages = Math.ceil((data?.totalCount || 0) / pageSize);

  // Handle search input changes
  const handleChange = (name: string, value: string) => {
    dispatch(setReserveFilters({ [name]: value }));
  };

  // Change page handler
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    dispatch(setReserveFilters({ page: newPage }));
  };

  // Save current search with a note
  const saveSearch = async (note: string) => {
    const searchQuery = filters.search;
    if (!searchQuery) {
      toast.warn("ابتدا عبارتی را جستجو کنید.");
      return;
    }

    saveSearchMutation({ searchQuery, note });
  };

  // Called when user clicks a saved search from the dropdown
  const handleSelectSavedSearch = (query: string) => {
    dispatch(setReserveFilters({ search: query }));
    setShowSavedSearches(false);
  };

  // Close saved search dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowSavedSearches(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full flex justify-end">
      <div className="lg:h-[calc(100vh-80px)] md:h-auto w-[calc(100%-7.25%)] flex flex-wrap lg:flex-nowrap font-yekan mx-auto">
        {/* Left Column: Filter + Results */}
        <div className="flex-grow animate-fade-left w-[55%]">
          {/* Top Bar: Filters + Search + Result Count */}
          <div className="h-[62px] w-full pb-6 rtl:lg:pl-7 ltr:lg:pr-7 flex gap-4">
            <FilterModal />
            <div className="flex items-center gap-1 text-sm font-medium border rounded-2xl px-2 h-12">
              <Megaphone />
              {t("propertiesCount")} {data?.totalCount}
            </div>

            {/* Search Input & Saved Searches Dropdown */}
            <div
              ref={containerRef}
              className="relative w-[calc(100%-242px)] flex gap-2 items-center"
            >
              <input
                value={filters.search || ""}
                onChange={(e) => handleChange("search", e.target.value)}
                onFocus={() => setShowSavedSearches(true)}
                className="h-12 border rounded-2xl border-border px-4 py-3 w-full rtl:pr-16 ltr:pl-16"
                placeholder={t("search")}
              />
              <span className="absolute rtl:right-6 ltr:left-6 top-3.5">
                <SearchSVG />
              </span>

              {/* Saved Searches Dropdown */}
              {showSavedSearches && (
                <div className="absolute top-full left-0 mt-1 w-full z-50">
                  <SavedSearchList onSelect={handleSelectSavedSearch} />
                </div>
              )}

              {/* Save Search Button */}
              {filters.search?.trim() && (
                <SaveSearchModal
                  searchQuery={filters.search}
                  onSave={saveSearch}
                />
              )}
            </div>
          </div>

          {/* Results List: Houses or Skeleton */}
          <div className="custom-scrollbar overflow-y-auto lg:max-h-[calc(100vh-142px)] px-0 flex flex-wrap gap-[24.95px] justify-center lg:justify-between">
            {isLoading &&
              [...Array(6)].map((_, i) => (
                <HouseSkeleton
                  key={i}
                  width="lg:w-[calc(50%-24.95px)] md:w-[calc(50%-10px)] w-full"
                  minWidth="min-w-[315px]"
                />
              ))}

            {/* Show House List */}
            {data?.houses && data?.houses.length > 0 ? (
              <>
                {data.houses.map((item, index) => (
                  <HouseCardList
                    key={index}
                    card={item}
                    setCurrentLoc={setCurrentLoc}
                    showOnMap
                    showFacilities={false}
                    width="lg:w-[calc(50%-12.475px)] md:w-[calc(50%-10px)] w-full"
                    minWidth="min-w-[315px]"
                  />
                ))}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div dir="ltr" className="w-full my-3 flex justify-center">
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious
                            onClick={() =>
                              page > 1 && handlePageChange(page - 1)
                            }
                            className={
                              page === 1
                                ? "pointer-events-none opacity-50"
                                : "cursor-pointer"
                            }
                          />
                        </PaginationItem>

                        {Array.from({ length: totalPages }, (_, i) => (
                          <PaginationItem key={i}>
                            <PaginationLink
                              isActive={i + 1 === page}
                              onClick={() => handlePageChange(i + 1)}
                            >
                              {i + 1}
                            </PaginationLink>
                          </PaginationItem>
                        ))}

                        <PaginationItem>
                          <PaginationNext
                            onClick={() =>
                              page < totalPages && handlePageChange(page + 1)
                            }
                            className={
                              page === totalPages
                                ? "pointer-events-none opacity-50"
                                : "cursor-pointer"
                            }
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                )}
              </>
            ) : (
              // Empty Result
              !isLoading && (
                <div className="font-bold text-2xl mt-1">{t("noResult")}</div>
              )
            )}
          </div>
        </div>

        {/* Right Column: Map */}
        <Map currentLoc={currentLoc} houses={data?.houses} />
      </div>
    </div>
  );
}

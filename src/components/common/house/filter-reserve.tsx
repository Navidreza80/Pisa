"use client";
// Dependencies
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import {
  useAppDispatch,
  useAppSelector,
} from "@/utils/hooks/react-redux/store/hook";
import { useTranslations } from "next-intl";

// Hooks
import {
  resetReserveFilters,
  setReserveFilters,
} from "@/utils/hooks/react-redux/store/slices/reserve-slice";

// Third party components
import InputSelect from "../inputs/select-input";

// Constant
import {
  facilityOptions,
  locationOptions,
  ratingOptions,
  sortOptions,
} from "@/utils/constant/folder";

/**
 * Filter reservation houses component.
 *
 * @component
 * @returns {JSX.Element} - Rendered filter modal
 */

export function FilterModal() {
  // Hooks
  const t = useTranslations("Filters");
  const dispatch = useAppDispatch();

  // Getting filters logic
  const filters = useAppSelector((state) => state.reserveFilters);

  // Changing the filter params value logic
  const handleChange = (name: string, value: any) => {
    dispatch(setReserveFilters({ [name]: value }));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className={`flex items-center hover:bg-[#4A5FE3] whitespace-nowrap justify-center overflow-hidden transition-all text-white h-12 w-[85px] text-[16px] rounded-2xl`}
        >
          {t("filter")}
        </Button>
      </DialogTrigger>
      <DialogContent className="!max-w-[350px]">
        <DialogHeader>
          <DialogTitle
          ></DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="block text-right text-sm font-medium">
              {t("address")}
            </label>
            <InputSelect
              items={locationOptions}
              value={filters.sort || ""}
              onChange={(value) => handleChange("search", value)}
              width={300}
              dir="rtl"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-right text-sm font-medium">
              {t("sort")}
            </label>
            <InputSelect
              items={sortOptions}
              value={filters.sort || ""}
              onChange={(value) => handleChange("sort", value)}
              width={300}
              dir="rtl"
            />
          </div>
          <div className="space-y-4">
            <div dir="rtl" className="flex flex-col gap-4">
              <div className="flex gap-1.5">
                <h1 className="text-text-secondary">{t("priceFrom")}</h1>
                <p className="text-text font-yekannum">{filters?.minPrice}</p>
              </div>
              <div className="flex gap-1.5">
                <h1 className="text-text-secondary">{t("priceTo")}</h1>
                <p className="text-text font-yekannum">{filters?.maxPrice}</p>
              </div>
            </div>
            <Slider
              value={[filters.minPrice || 0, filters.maxPrice || 5000000]}
              onValueChange={(value) => {
                handleChange("minPrice", value[0]);
                handleChange("maxPrice", value[1]);
              }}
              min={0}
              max={5000000}
              step={100000}
            />
          </div>
          <div className="space-y-2">
            <label className="block text-right text-sm font-medium">
              {t("facilities")}
            </label>
            <InputSelect
              items={facilityOptions}
              value={filters.facilities || ""}
              onChange={(value) => handleChange("facilities", value)}
              width={300}
              dir="rtl"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-right text-sm font-medium">
              {t("rate")}
            </label>
            <InputSelect
              items={ratingOptions}
              value={filters.rating || ""}
              onChange={(value) => handleChange("rating", value)}
              width={300}
              dir="rtl"
            />
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button
              className="text-white"
              onClick={() => dispatch(resetReserveFilters())}
            >
              {t("delete")}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

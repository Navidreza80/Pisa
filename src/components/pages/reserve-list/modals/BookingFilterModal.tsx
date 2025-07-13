"use client";
import Button from "@/components/common/button";
import Modal from "@/components/common/modal/modal";
import { Slider } from "@/components/ui/slider";
import { locationOptions, sortOptions } from "@/utils/constant/folder";
import {
  useAppDispatch,
  useAppSelector,
} from "@/utils/hooks/react-redux/store/hook";
import {
  resetReserveFilters,
  setReserveFilters,
} from "@/utils/hooks/react-redux/store/slices/reserve-slice";
import { useTranslations } from "next-intl";
import InputSelect from "../../../common/inputs/select-input";

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
  const handleChange = (name: string, value: string | number) => {
    dispatch(setReserveFilters({ [name]: value }));
  };

  const filterInputs = [
    {
      text: t("address"),
      items: locationOptions,
      value: filters.location,
      name: "search",
    },
    {
      text: t("sort"),
      items: sortOptions,
      value: filters.sort,
      name: "sort",
    },
  ];

  return (
    <Modal
      className="!max-w-[350px]"
      trigger={<Button className="!w-auto">{t("filter")}</Button>}
    >
      <div className="space-y-6">
        {filterInputs.map((item, index) => (
          <div key={index} className="space-y-2">
            <label className="block  text-sm font-medium">
              {item.text}
            </label>
            <InputSelect
              items={item.items}
              value={item.value}
              onChange={(value) => handleChange(item.name, value)}
              width={300}
            />
          </div>
        ))}
        <div className="space-y-4">
          <div  className="flex flex-col gap-4">
            <div className="flex gap-1.5">
              <h1 className="text-text-secondary">{t("priceFrom")}</h1>
              <p className="text-text ">{filters?.minPrice}</p>
            </div>
            <div className="flex gap-1.5">
              <h1 className="text-text-secondary">{t("priceTo")}</h1>
              <p className="text-text ">{filters?.maxPrice}</p>
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
        <div className="flex gap-2 pt-4">
          <Button
            className="text-white"
            handleClick={() => dispatch(resetReserveFilters())}
          >
            {t("delete")}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

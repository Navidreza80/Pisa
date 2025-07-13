"use client";

import Button from "@/components/common/button";
import {
  locationOptions,
  propertyOptions,
  transactionTypeOptions,
} from "@/utils/constant/folder";
import {
  useAppDispatch,
  useAppSelector,
} from "@/utils/hooks/react-redux/store/hook";
import {
  resetRentFilters,
  setRentFilters,
} from "@/utils/hooks/react-redux/store/slices/rent-slice";
import InputSelect from "@/components/common/inputs/select-input";
import InputText from "@/components/common/inputs/text-inputs";
import Modal from "@/components/common/modal/modal";
import { useTranslations } from "next-intl";
import DivButton from "@/components/common/DivButton";

/**
 * Filter rent component for filtering houses.
 *
 * @component
 * @returns {JSX.Element} - Rendered filter rent
 */

const FilterModal = () => {
  // Hooks
  const t = useTranslations("Filters");
  const dispatch = useAppDispatch();

  // Get filters logic
  const filters = useAppSelector((state) => state.rentFilters);

  // Change filters params logic
  const handleChange = (name: string, value: string | number) => {
    dispatch(setRentFilters({ [name]: value }));
  };

  const inputs = [
    {
      text: t("location"),
      items: locationOptions,
      value: filters.search,
      name: "search",
      type: "select",
    },
    {
      text: t("property"),
      items: propertyOptions,
      value: filters.propertyType,
      name: "propertyType",
      type: "select",
    },
    {
      text: t("transaction"),
      items: transactionTypeOptions,
      value: filters.transactionType,
      name: "transactionType",
      type: "select",
    },
    {
      text: t("transaction"),
      items: transactionTypeOptions,
      value: filters.transactionType,
      name: "transactionType",
      type: "select",
    },
    {
      text: t("minRent"),
      value: filters.minRent,
      name: "minRent",
      type: "text",
    },
    {
      text: t("maxRent"),
      value: filters.maxRent,
      name: "maxRent",
      type: "text",
    },
    {
      text: t("minArea"),
      value: filters.minArea,
      name: "minArea",
      type: "text",
    },
    {
      text: t("maxArea"),
      value: filters.maxArea,
      name: "maxArea",
      type: "text",
    },
  ];

  return (
    <Modal
      className="lg:!max-w-[1184px] md:!max-w-[700px] !max-w-[400px]"
      trigger={<DivButton className="!w-auto px-4">{t("filter")}</DivButton>}
    >
      <div className="flex flex-wrap justify-between gap-6">
        {inputs.map((item, index) => {
          return (
            <div key={index} className="space-y-2">
              <label className="block  text-sm font-medium">{item.text}</label>
              {item.type == "select" ? (
                <InputSelect
                  items={item.items}
                  value={item.value}
                  onChange={(value) => handleChange(item.name, value)}
                  width={262}
                />
              ) : (
                <InputText
                  value={item.value}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleChange(item.name, e.target.value)
                  }
                  width="w-[262px]"
                />
              )}
            </div>
          );
        })}

        <div className="flex justify-end gap-2 pt-4">
          <Button
            className="text-white"
            handleClick={() => dispatch(resetRentFilters())}
          >
            {t("delete")}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default FilterModal;

// Dependencies
import axios from "@/utils/interceptor";

// Types
import type { HouseFilters, HouseItemsInterface } from "@/types/house";

/**
 * Get all houses.
 * @param {HouseFilters} params
 * @returns response with complete registration process
 */
export const fetchHouses = async (
  params: HouseFilters
): Promise<HouseItemsInterface[]> => {
  const requiredParams = {
    transactionType: params.transactionType || "",
    ...params,
  };

  const cleanedParams = Object.fromEntries(
    Object.entries(requiredParams).filter(
      ([, value]) =>
        value !== undefined &&
        value !== null &&
        !(typeof value === "number" && isNaN(value))
    )
  );

  const response = await axios.get<HouseItemsInterface[]>("/houses", {
    params: cleanedParams,
  });
  return response.data;
};

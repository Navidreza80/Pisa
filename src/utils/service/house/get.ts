// Interceptor
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
): Promise<{ houses: HouseItemsInterface[]; totalCount: number }> => {
  // Always include transactionType even if empty
  const requiredParams = {
    transactionType: params.transactionType || "", // Force include
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

  return axios.get("/houses", { params: cleanedParams });
};

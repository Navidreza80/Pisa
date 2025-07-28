// Interceptor
import { HouseItemsInterface } from "@/types/house";
import http from "@/utils/interceptor";

/**
 * Get all Seller houses from the server with dynamic parameters.
 * @param params Object containing query parameters like `page` and `limit`
 * @returns response with array of objects including all Seller houses.
 */
export async function getAllSellerHouses(params: {
  search?: string;
  page?: string;
  limit?: string;
  sort?: string;
  order?: string;
}): Promise<{ houses: HouseItemsInterface[]; totalCount: number }> {
  try {
    const response = await http.get<{ houses: HouseItemsInterface[]; totalCount: number }>(`/houses/seller/user`, { params });
    return response;
  } catch (error) {
    console.error("Error fetching houses:", error);
    throw error;
  }
}


// Interceptor
import http from "@/utils/interceptor";

/**
 * Get all locations from the server with dynamic parameters.
 * @param params Object containing query parameters like `page` and `limit`
 * @returns response with array of objects including all locations.
 */
export async function getAllSellerHouses() {
  try {
    const response = await http.get(`/houses/seller/user`);
    return response;
  } catch (error) {
    console.error("Error fetching houses:", error);
    throw error;
  }
}

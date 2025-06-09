import type { Location } from "@/types/house";

// Interceptor
import http from "@/utils/interceptor";

/**
 * Get all locations from the server with dynamic parameters.
 * @param params Object containing query parameters like `page` and `limit`
 * @returns response with array of objects including all locations.
 */
export async function getAllLocations(
  params: { page?: number; limit?: number } = {}
): Promise<Location[]> {
  try {
    const response = await http.get<Location[]>(`/locations`, { params });
    return response;
  } catch (error) {
    console.error("Error fetching locations:", error);
    throw error;
  }
}

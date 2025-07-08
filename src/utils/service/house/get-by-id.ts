// Types
import type { HouseItemsInterface } from "@/types/house";

// Interceptor
import http from "@/utils/interceptor";

/**
 * Get all locations from the server.
 * @returns response with array of objects including all locations.
 */
export async function getHouseById(
  id: string
): Promise<HouseItemsInterface> {
  try {
    const response = await http.get<HouseItemsInterface>(`/houses/${id}`);
    return response;
  } catch (error) {
    console.error("Error fetching house detail:", error);
    throw error;
  }
}

// Dependencies
import { AxiosResponse } from "axios";

// Types
import type { Location } from "@/types/house";

// Interceptor
import http from "@/utils/interceptor";

/**
 * Get all locations from the server.
 * @returns response with array of objects including all locations.
 */
export async function getAllLocations(): Promise<AxiosResponse<Location[]>> {
  try {
    const response = await http.get<Location[]>(`/locations`);
    return response;
  } catch (error) {
    console.error("Error fetching locations:", error);
    throw error;
  }
}

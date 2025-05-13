import { Location } from "@/types/house";
import http from "@/utils/interceptor";

export async function getAllLocations(): Promise<Location[]> {
  try {
    const result = await http.get(`/locations`);
    return result;
  } catch (error) {
    return error;
  }
}

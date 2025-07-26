// Interceptor
import http from "@/utils/interceptor";

/**
 * Delete favorite.
 * @param params - houseId.
 */

export default async function deleteFavorite(house_id: string) {
  try {
    const result = await http.delete(`/favorites/${house_id}`);
    return result;
  } catch (error) {
    return error;
  }
}

// Interceptor
import http from "@/utils/interceptor";
import { getServerCookie } from "../storage/server-cookie";

/**
 * Post favorites.
 * @param params - houseId, userId.
 */

export default async function createFavorite(house_id: string) {
  try {
    const user_id = await getServerCookie("userId");
    const result = await http.post(`/favorites`, { house_id, user_id });
    return result;
  } catch (error) {
    return error;
  }
}

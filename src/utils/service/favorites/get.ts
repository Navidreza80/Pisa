// Interceptor
import http from "@/utils/interceptor";
import { getServerCookie } from "../storage/server-cookie";

/**
 * Get all users favorites.
 */

export default async function getAllFavorites() {
  try {
    const user_id = await getServerCookie("userId");
    const result = await http.get(`/favorites/user/${user_id}`);
    return result;
  } catch (error) {
    return error;
  }
}

// Interceptor
import http from "@/utils/interceptor";
import { getServerCookie } from "../storage/server-cookie";

/**
 * Delete users wishlist.
 */
export async function deleteWishlist(houseId: string) {
  try {
    const userId = await getServerCookie("userId");
    const response = await http.delete(`/wishlist/${userId}`, {
      data: { houseId },
    });
    return response;
  } catch (error) {
    console.error("Error deleting wishlist:", error);
    throw error;
  }
}

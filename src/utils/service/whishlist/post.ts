"use server";
// Interceptor
import http from "@/utils/interceptor";

/**
 * Post wishlist.
 * @param params - houseId.
 */

export default async function postWishlist(data: { houseId: string }) {
  try {
    const result = await http.post(`/wishlist`, data);
    return result;
  } catch (error) {
    return error;
  }
}

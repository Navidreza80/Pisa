// Interceptor
import http from "@/utils/interceptor";

/**
 * Get all wishlist from the server with dynamic parameters.
 * @param params Object containing query parameters like `page` and `limit`
 * @returns response with array of objects including all wishlist.
 */
export async function getAllWishlist(params: {
  page?: string;
  limit?: string;
  sort?: string;
  order?: string;
}) {
  try {
    const response = await http.get("/wishlist", { params });
    return response;
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    throw error;
  }
}

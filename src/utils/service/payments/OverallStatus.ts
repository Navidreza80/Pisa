// Interceptor
import http from "@/utils/interceptor";

/**
 * Get all overall sellers payments.
 * @returns response with  overall sellers payments.
 */

export async function getOverallSellerStatus() {
  try {
    const response = await http.get(`/seller/finance/dashboard`);
    return response;
  } catch (error) {
    console.error("Error fetching overall payments status:", error);
    throw error;
  }
}

// Types
import { Question } from "@/types/qa";

// Interceptor
import http from "@/utils/interceptor";

/**
 * Get all sellers payments.
 * @returns response with array of objects sellers payments.
 */

export async function getSellerPayments() {
  try {
    const response = await http.get(`/seller/finance`);
    return response;
  } catch (error) {
    console.error("Error fetching payments:", error);
    throw error;
  }
}

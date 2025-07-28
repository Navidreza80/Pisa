// Interceptor
import http from "@/utils/interceptor";

/**
 * Get all sellers payments.
 * @returns response with array of objects sellers payments.
 */

export async function getSellerPayments(params: {
  page: string;
  limit: string;
}) {
  try {
    const response = await http.get(`/seller/finance`, { params });
    return response;
  } catch (error) {
    console.error("Error fetching payments:", error);
    throw error;
  }
}

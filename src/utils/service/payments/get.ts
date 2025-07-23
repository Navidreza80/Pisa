// Types
import { Question } from "@/types/qa";

// Interceptor
import http from "@/utils/interceptor";

/**
 * Get all users payments.
 * @returns response with array of objects user's payments.
 */

export async function getAllPayments() {
  try {
    const response = await http.get(`/payments`);
    return response;
  } catch (error) {
    console.error("Error fetching payments:", error);
    throw error;
  }
}

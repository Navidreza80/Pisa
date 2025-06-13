// Types
import { Question } from "@/types/qa";

// Interceptor
import http from "@/utils/interceptor";

/**
 * Get all property's QA.
 * @returns response with array of objects property's QA.
 */

export async function getPropertyQA(id: string): Promise<Question[]> {
  try {
    const response = await http.get<Question[]>(`/property-qa/${id}`);
    return response;
  } catch (error) {
    console.error("Error fetching locations:", error);
    throw error;
  }
}

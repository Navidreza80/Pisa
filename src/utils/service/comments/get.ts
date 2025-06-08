// Types
import type { Comments } from "@/types/comments";

// Interceptor
import http from "@/utils/interceptor";

/**
 * Get all properties comments.
 * @param  params - id, rows.
 * @returns {Comments[]} response.
 */

export async function getAllPropertyComments(
  id: string,
  rows: number
): Promise<Comments[]> {
  try {
    const response = await http.get<Comments[]>(
      `/houses/${id}/comments?page=1&limit=${rows}`
    );
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

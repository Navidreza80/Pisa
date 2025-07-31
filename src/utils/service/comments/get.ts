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
  params: {
    page?: string;
    sort?: string;
    limit?: string;
    order?: string;
  }
): Promise<Comments[]> {
  try {
    const response = await http.get<Comments[]>(`/houses/${id}/comments`, {
      params,
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export async function getSellerComments(params: {
  page?: string;
  sort?: string;
  rating?: string;
  house_id?: string;
  limit?: string;
  order?: string;
}): Promise<Comments[]> {
  try {
    const response = await http.get<Comments[]>(`/comments`, {
      params,
    });
    return response;
  } catch (error) {
    throw error;
  }
}

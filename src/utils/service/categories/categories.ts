"use server";
// Interceptor
import http from "@/utils/interceptor";

/**
 * Get all categories from server.
 * @returns response with all categories.
 */

export default async function getAllCategories(
  params: { page?: number; limit?: number } = {}
) {
  try {
    const result = await http.get(`/categories`, { params });
    return result;
  } catch (error) {
    return error;
  }
}

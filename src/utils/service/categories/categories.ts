"use server"
// Interceptor
import http from "@/utils/interceptor";

/**
 * Get all categories from server.
 * @returns response with all categories.
 */

export default async function getAllCategories() {
  try {
    const result = await http.get(`/categories`);
    return result;
  } catch (error) {
    return error;
  }
}

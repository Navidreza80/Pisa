"use server";
// Interceptor
import http from "@/utils/interceptor";

/**
 * Get dashboard summary.
 * @returns response dashboard summary.
 */

export default async function getDashboardSummary() {
  try {
    const result = await http.get(`/dashboard/summary`);
    return result;
  } catch (error) {
    return error;
  }
}

// Interceptor
import http from "@/utils/interceptor";

/**
 * Get all users notifications.
 * @returns response with array of objects user's notifications.
 */

export async function getAllNotifications(params: {
  page?: string;
  limit?: string;
}) {
  try {
    const response = await http.get(`/notifications`, { ...params, sort: "createdAt", order: "DESC" });
    return response;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    throw error;
  }
}

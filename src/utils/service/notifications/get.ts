// Interceptor
import http from "@/utils/interceptor";
import { getServerCookie } from "../storage/server-cookie";

/**
 * Get all users notifications.
 * @returns response with array of objects user's notifications.
 */

export async function getAllNotifications(params: {
  page?: string;
  limit?: string;
  sort?: string;
  order?: string;
}) {
  try {
    const userId = getServerCookie("userId");
    const response = await http.get(`/notifications/${userId}`, { params });
    return response;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    throw error;
  }
}

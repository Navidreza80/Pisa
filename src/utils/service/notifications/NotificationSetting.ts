// Interceptor
import http from "@/utils/interceptor";

/**
 * Get all users notifications settings.
 * @returns response with array of objects user's notifications settings.
 */

export async function getNotificationSetting() {
  try {
    const response = await http.get(`/targeted-notifications/settings`);
    return response;
  } catch (error) {
    console.error("Error fetching notifications settings:", error);
    throw error;
  }
}

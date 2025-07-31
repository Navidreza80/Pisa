// Interceptor
import http from "@/utils/interceptor";

export async function MarkAllAsRead() {
  try {
    const response = await http.put(`/notifications/mark-all-as-read`);
    return response;
  } catch (error) {
    console.error("Error marking notifications:", error);
    throw error;
  }
}

export async function MarkAsRead(notificationId: string) {
  try {
    const response = await http.put(`/notifications/${notificationId}/read`);
    return response;
  } catch (error) {
    console.error("Error marking notification as read:", error);
    throw error;
  }
}

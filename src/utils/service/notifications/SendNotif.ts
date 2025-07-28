// Interceptor
import http from "@/utils/interceptor";
import { getServerCookie } from "../storage/server-cookie";

export async function sendRealTimeNotif(data) {
  const user_id = await getServerCookie("userId");
  try {
    const response = await http.post(`/notifications`, {
      room: "new house",
      notification: {
        userId: user_id,
        title: data.title,
        message: data.message,
        type: data.type,
      },
    });
    return response;
  } catch (error) {
    console.error("Error sending notifications:", error);
    throw error;
  }
}

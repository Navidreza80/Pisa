// Interceptor
import http from "@/utils/interceptor";
import { getServerCookie } from "../storage/server-cookie";

export async function getUserActivity() {
  try {
    const userId = await getServerCookie("userId");
    const response = await http.get(`/user-activity/${userId}`);
    return response;
  } catch (error) {
    console.error("Error fetching activity:", error);
    throw error;
  }
}

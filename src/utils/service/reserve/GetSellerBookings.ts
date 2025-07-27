// Interceptor
import http from "@/utils/interceptor";
import { getServerCookie } from "../storage/server-cookie";

/**
 * Get all sellers customers booking.
 * @returns response with array of objects including all sellers customers bookings.
 */
export async function GetSellerBooking({
  params,
}: {
  params: { limit?: string; search?: string };
}) {
  try {
    const userId = await getServerCookie("userId");
    console.log(userId);
    const response = await http.get(`/bookings/${userId}/customers`, {
      params,
    });
    return response;
  } catch (error) {
    console.error("Error fetching bookings:", error);
    throw error;
  }
}

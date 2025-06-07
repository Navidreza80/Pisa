// Interceptor
import http from "@/utils/interceptor";

/**
 * Get all users booking.
 * @returns response with array of objects including all users bookings.
 */
export async function bookHotel(data) {
  try {
    const response = await http.post(`/bookings`, data);
    return response;
  } catch (error) {
    console.error("Error fetching locations:", error);
    throw error;
  }
}

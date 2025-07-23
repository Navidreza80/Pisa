// Interceptor
import http from "@/utils/interceptor";

/**
 * Cancel user booking.
 */
export async function cancelBooking(id) {
  try {
    const response = await http.post(`/bookings/${id}/cancel`);
    return response;
  } catch (error) {
    console.error("Error cancelling a booking:", error);
    throw error;
  }
}

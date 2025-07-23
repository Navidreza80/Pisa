// Interceptor
import http from "@/utils/interceptor";

/**
 * Continue user booking.
 */
export async function continueBooking(id) {
  try {
    const response = await http.post(`/bookings/${id}/continue`);
    return response;
  } catch (error) {
    console.error("Error continuing a booking:", error);
    throw error;
  }
}

// Interceptor
import http from "@/utils/interceptor";

/**
 * Confirm user booking.
 */
export async function confirmBooking(id: string) {
  try {
    const response = await http.put(`/bookings/${id}`, {
      status: "confirmed",
    });
    return response;
  } catch (error) {
    console.error("Error confirming a booking:", error);
    throw error;
  }
}

// Interceptor
import http from "@/utils/interceptor";

/**
 * Delete all users booking.
 */
export async function deleteReservation(id) {
  try {
    const response = await http.delete(`/bookings/${id}`);
    return response;
  } catch (error) {
    console.error("Error deleting booking:", error);
    throw error;
  }
}

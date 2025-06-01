// Dependencies
import { AxiosResponse } from "axios";

// Types
import { Reservation } from "@/types/reserve";

// Interceptor
import http from "@/utils/interceptor";

/**
 * Get all users booking.
 * @returns response with array of objects including all users bookings.
 */
export async function getBookingList(): Promise<Reservation[]> {
  try {
    const response = await http.get<Reservation[]>(`/bookings`);
    return response;
  } catch (error) {
    console.error("Error fetching locations:", error);
    throw error;
  }
}

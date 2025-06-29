// Interceptor
import http from "@/utils/interceptor";

export async function deleteHouse(id) {
  try {
    const response = await http.delete(`/houses/${id}`);
    return response;
  } catch (error) {
    console.error("Error deleting house:", error);
    throw error;
  }
}

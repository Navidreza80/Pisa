// Interceptor
import http from "@/utils/interceptor";

export async function putHouse(data, id) {
  try {
    const response = await http.put(`/houses/${id}`, data);
    return response;
  } catch (error) {
    console.error("Error editing houses:", error);
    throw error;
  }
}

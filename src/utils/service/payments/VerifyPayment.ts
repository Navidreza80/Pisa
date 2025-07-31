// Interceptor
import http from "@/utils/interceptor";

export async function verifyPayment(id: string) {
  try {
    const response = await http.post(`/payments/${id}/verify`);
    return response;
  } catch (error) {
    console.error("Error verify payments:", error);
    throw error;
  }
}

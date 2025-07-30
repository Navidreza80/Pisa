// Interceptor
import http from "@/utils/interceptor";

export default async function sendDocument(data) {
  try {
    const result = await http.post(`/documents/upload`, data);
    return result;
  } catch (error) {
    return error;
  }
}

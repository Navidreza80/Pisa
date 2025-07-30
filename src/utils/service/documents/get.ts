// Interceptor
import http from "@/utils/interceptor";

export default async function fetchDocuments(id, params) {
  try {
    const result = await http.get(`/documents/house/${id}`, { params });
    return result;
  } catch (error) {
    return error;
  }
}

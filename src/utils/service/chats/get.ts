// Interceptor
import http from "@/utils/interceptor";

export default async function getAllChats() {
  try {
    const result = await http.get(`/chats`);
    return result;
  } catch (error) {
    return error;
  }
}

/* eslint-disable */

// Interceptor
import http from "@/utils/interceptor";

export default async function sendMessage(data: any) {
  try {
    const result = await http.post(`/chats/send`, data);
    return result;
  } catch (error) {
    return error;
  }
}

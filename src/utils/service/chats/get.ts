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

export async function getChatHistory(roomId: string) {
  try {
    const result = await http.get(`/chats/${roomId}`);
    return result;
  } catch (error) {
    return error;
  }
}

export async function getRoomsUsers(roomId: string) {
  try {
    const result = await http.get(`/chats/users-in-room/${roomId}`);
    return result;
  } catch (error) {
    return error;
  }
}

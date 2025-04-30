"use server";
import http from "@/utils/interceptor";

export default async function postFavorite(userId, houseId) {
  try {
    const result = await http.post(`/favorites/add`, {
      user_id: userId,
      house_id: houseId,
    });
    return result;
  } catch (error) {
    return error;
  }
}

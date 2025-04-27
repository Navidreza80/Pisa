"use server";
import http from "@/utils/interceptor";

export default async function deleteFavorite(userId, houseId) {
  try {
    const result = await http.delete(`/favorites/remove`, {
      data: {
        user_id: userId,
        house_id: houseId,
      },
    });
    return result;
  } catch (error) {
    return error;
  }
}

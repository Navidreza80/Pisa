"use server";
// Interceptor
import http from "@/utils/interceptor";

/**
 * Log out.
 * @param params - refreshToken.
 */

export default async function postLogOut() {
  try {
    const result = await http.post(`/auth/logout`);
    return result;
  } catch (error) {
    return error;
  }
}

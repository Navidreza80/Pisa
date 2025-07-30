// Interceptor
import http from "@/utils/interceptor";

export default async function changePass(data) {
  try {
    const result = await http.put(`/users/change-password`, data);
    return result;
  } catch (error) {
    return error;
  }
}

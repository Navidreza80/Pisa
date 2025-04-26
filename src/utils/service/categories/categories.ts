"use server"
import http from "@/utils/interceptor";

export default async function getAllCategories() {
  try {
    const result = await http.get(`/categories`);
    return result;
  } catch (error) {
    return error;
  }
}

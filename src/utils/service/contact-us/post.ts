"use server";
import http from "@/utils/interceptor";

export default async function postMessage({title, message}) {
  try {
    const result = await http.post(`/contact-us`, {
      title: title,
      message: message,
    });
    return result;
  } catch (error) {
    return error;
  }
}

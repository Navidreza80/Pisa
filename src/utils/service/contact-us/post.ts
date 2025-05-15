"use server";
// Interceptor
import http from "@/utils/interceptor";

/**
 * Post message to admin for contact us section.
 * @param params - title message.
 * @returns response with contact us message.
 */

export default async function postMessage({title, message}: {title: string; message: string}) {
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

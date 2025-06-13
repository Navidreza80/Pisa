"use server";
// Interceptor
import http from "@/utils/interceptor";

/**
 * Post question.
 * @param params - houseId, question.
 */

export default async function postQuestion(data: {
  houseId: string;
  question: string;
}) {
  try {
    const result = await http.post(`/property-qa/question`, data);
    return result;
  } catch (error) {
    return error;
  }
}

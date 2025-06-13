"use server";
// Interceptor
import http from "@/utils/interceptor";

/**
 * Post answer.
 * @param params - answer, questionId.
 */

export default async function postAnswer(data: {
  questionId: string;
  answer: string;
}) {
  try {
    const result = await http.post(`/property-qa/answer`, data);
    return result;
  } catch (error) {
    return error;
  }
}

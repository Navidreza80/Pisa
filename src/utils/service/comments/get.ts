import { Comments } from "@/types/comments";
import http from "@/utils/interceptor";

const getAllPropertyComments = async (
  id: number,
  rows: number
): Promise<Comments[]> => {
  try {
    const result = await http.get(
      `/houses/${id}/comments?page=1&limit=${rows}`
    );
    return result;
  } catch (error) {
    return error;
  }
};

export { getAllPropertyComments };

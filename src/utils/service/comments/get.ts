import { Comments } from "@/types/comments";
import http from "@/utils/interceptor";

const getAllPropertyComments = async (id: number): Promise<Comments[]> => {
  try {
    const result = await http.get(`/houses/${id}/comments`);
    return result;
  } catch (error) {
    return error;
  }
};

export { getAllPropertyComments };

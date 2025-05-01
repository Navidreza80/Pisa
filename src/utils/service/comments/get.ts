import http from "@/utils/interceptor";

const getLandingComments = async () => {
  try {
    const result = await http.get(`/comments`);
    return result;
  } catch (error) {
    return error;
  }
};

export { getLandingComments };

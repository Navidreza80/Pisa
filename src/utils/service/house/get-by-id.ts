import http from "@/utils/interceptor";

const getHouseById = async (id: string) => {
  try {
    const result = await http.get(`/houses/${id}`);
    return result;
  } catch (error) {
    return error;
  }
};

export { getHouseById };

import { HouseItemsInterface } from "@/types/house";
import http from "@/utils/interceptor";

const getHouseById = async (id: number): Promise<HouseItemsInterface> => {
  try {
    const result = await http.get(`/houses/${id}`);
    return result;
  } catch (error) {
    return error;
  }
};

export { getHouseById };

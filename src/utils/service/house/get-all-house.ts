import { HouseInterFace } from "@/types/house";
import http from "@/utils/interceptor";

const getAllHouse = async (
  pageNumber,
  limit,
  sort,
  order,
  capacity,
  address
) => {
  try {
    const result = await http.get(
      `/houses?page=1&limit=10${sort && "sort=sort"}${order && "&order=order"}${
        address && "&address=address"
      }${capacity && "&capacity=capacity"}`
    );
    return result;
  } catch (error) {
    return error;
  }
};

export { getAllHouse };

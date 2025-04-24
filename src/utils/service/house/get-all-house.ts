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
      `/houses?page=${pageNumber}&limit=${limit}${sort && "sort="+sort}${order && "&order="+order}${address && "&adress="+address}${capacity && "&capacity="+capacity}`
    );
    return result;
  } catch (error) {
    return error;
  }
};

export { getAllHouse };


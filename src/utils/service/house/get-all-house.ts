import http from "@/utils/interceptor";

const getAllHouse = async (
  pageNumber,
  limit,
  sort,
  order,
  address,
  type,
  propertyType,
) => {
  try {
    const result = await http.get(
      `/houses?page=${pageNumber}&propertyType=${propertyType}&limit=${limit}&transactionType=${type}${sort && "&sort="+sort}${order && "&order="+order}${address && "&address="+address}`
    );
    return result;
  } catch (error) {
    return error;
  }
};

export { getAllHouse };


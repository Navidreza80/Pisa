import http from "@/utils/interceptor";

const getAllHouse = async (
  pageNumber,
  limit,
  sort,
  order,
  address,
  type,
  propertyType,
  maxPrice,
  minPrice
) => {
  try {
    const result = await http.get(
      `/houses?page=${pageNumber}&propertyType=${propertyType}&limit=${limit}&transactionType=${type}${
        sort && "&sort=" + sort
      }${order && "&order=" + order}${address && "&search=" + address}${
        maxPrice && "&maxPrice=" + maxPrice
      }${minPrice && "&minPrice=" + minPrice}`
    );
    return result;
  } catch (error) {
    return error;
  }
};

export { getAllHouse };

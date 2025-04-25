import http from "@/utils/interceptor";

const getAllLocations = async (

) => {
  try {
    const result = await http.get(
      `/locations`
    );
    return result;
  } catch (error) {
    return error;
  }
};

export { getAllLocations };


import http from "@/utils/interceptor";

export default async function getHousesComparisonByIds(ids) {
  try {
    const result = http.get(`/comparison?ids=${ids}`);
    return result;
  } catch (e) {
    return e;
  }
}

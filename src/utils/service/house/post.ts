// Interceptor
import { HouseItemsInterface } from "@/types/house";
import http from "@/utils/interceptor";

export default async function postHouse(
  formData: HouseItemsInterface | undefined
) {
  try {
    const result = await http.post("/houses", formData);
    return result;
  } catch (error) {
    console.log(error);
  }
}

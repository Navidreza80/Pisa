// Interceptor
import http from "@/utils/interceptor";

export default async function postHousePicture(data) {
  const formData = new FormData();
  formData.append("photos", data.formData);
  try {
    const result = await http.post(
      `/houses/upload/photos/${data.id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return result;
  } catch (error) {
    return error;
  }
}

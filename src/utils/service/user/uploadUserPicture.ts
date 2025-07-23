// @/utils/service/user/uploadUserPicture.ts
import http from "@/utils/interceptor";
import { getClientCookie } from "../storage/client-cookie";
import { useMutation } from "@tanstack/react-query";

interface UploadResponse {
  message: string;
  imageUrl: string;
}

/**
 * Upload profile picture to /users/upload/picture
 * using Bearer token from cookie.
 */
export async function uploadPicture(file: File): Promise<UploadResponse> {
  const token = getClientCookie("clientAccessToken");

  if (!token) {
    throw new Error("token not found");
  }

  const formData = new FormData();
  formData.append("picture", file);

  const response = await http.put("/users/upload/picture", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export const useUploadPicture = () => {
  return useMutation({
    mutationFn: uploadPicture,
  });
};

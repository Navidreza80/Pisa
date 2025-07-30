import http from "@/utils/interceptor";
import { getClientCookie } from "../storage/client-cookie";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";

interface UploadResponse {
  message: string;
  imageUrl: string;
}

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
  const t = useTranslations("Dashboard"); 

  return useMutation({
    mutationFn: uploadPicture,
    onSuccess: () => {
      toast.success(t("uploadSuccess"));
    },
    onError: (error: any) => {
      const fallback = t("uploadError");
      const serverError = error?.response?.data?.message;
      toast.error(serverError || fallback);
    },
  });
};

import { toast } from "react-toastify";
import {
  getServerCookie,
  setServerCookie,
} from "../service/storage/server-cookie";
import axios, { AxiosResponse, AxiosError } from "axios";

export const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

const instance = axios.create({
  baseURL: baseURL,
});

const onSuccess = <T>(response: AxiosResponse<T>): T => {
  return response.data;
};

export const onError = (error: AxiosError): Promise<never> => {
  if (error.response) {
    const { status, data } = error.response;

    // 401 Unauthorized or 403 Forbidden
    if (status === 401 || status === 403) {
      toast.info(
        "دسترسی شما به امکانات سایت منقضی شده. لطفا دوباره وارد شوید!"
      );
      setTimeout(() => {
        window.location.href = "/auth/login";
      }, 1500);
    }

    // 400–499 (Other Client Errors)
    else if (status >= 400 && status < 500) {
      const message = (data as any)?.message || `خطای کاربر: ${status}`;
      toast.warning(message);
      console.warn("Client Error:", status, data);
    }

    // 500+ Server Errors
    else if (status >= 500) {
      toast.error("خطایی در سرور رخ داده است. لطفاً بعداً امتحان کنید.");
      console.error("Server Error:", status, data);
    }
  } else if (error.request) {
    // No response received
    toast.error("پاسخی از سرور دریافت نشد. اتصال اینترنت خود را بررسی کنید.");
    console.error("No response received:", error.request);
  } else {
    // Request setup error
    toast.error("مشکلی در ارسال درخواست رخ داد.");
    console.error("Axios setup error:", error.message);
  }

  return Promise.reject(error);
};

instance.interceptors.response.use(onSuccess, onError);

instance.interceptors.request.use(
  async (config) => {
    const token = await getServerCookie("serverAccessToken");
    if (token != null) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;

// Response interceptor to handle 401 errors (token expired)
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Attempt to refresh
      const refreshToken = await getServerCookie("refreshToken");
      if (refreshToken) {
        try {
          const res = await fetch(
            "https://delta-project.liara.run/api/auth/refresh",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ token: refreshToken }),
            }
          );
          if (res.ok) {
            const data = await res.json();
            await setServerCookie("serverAccessToken", data.accessToken);
            // Retry the original request with new token
          }
        } catch (refreshError) {
          console.log(refreshError);
        }
      }
    }
    return Promise.reject(error);
  }
);

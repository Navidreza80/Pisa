/* eslint-disable */

import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { deleteClientCookie } from "../service/storage/client-cookie";
import {
  getServerCookie,
  setServerCookie,
} from "../service/storage/server-cookie";
import deleteServerCookieAction from "./deleteServerCookieAction";

export const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: baseURL,
});

/** Typed success handler: extracts only `data` */
const onSuccess = <T>(response: AxiosResponse<T>): T => {
  return response.data;
};

export const onError = async (error: AxiosError): Promise<never> => {
  if (error.response) {
    const { status, data } = error.response;

    if (status === 401 || status === 403) {
      deleteServerCookieAction("serverAccessToken");
      deleteClientCookie("clientAccessToken");
      console.log("unauthorized");
      setTimeout(() => {
        window.location.href = "/auth/login";
      }, 1500);
    } else if (status >= 400 && status < 500) {
      const message = (data as any)?.message || `خطای کاربر: ${status}`;
      console.warn("Client Error:", status, data);
    } else if (status >= 500) {
      console.error("Server Error:", status, data);
    }
  } else if (error.request) {
    console.error("No response received:", error.request);
  } else {
    console.error("Axios setup error:", error.message);
  }

  return Promise.reject(error);
};

// Set up interceptors
axiosInstance.interceptors.response.use(onSuccess, onError);

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await getServerCookie("serverAccessToken");
    console.log(token);
    if (typeof token === "string") {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Token refresh logic
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const refreshToken = await getServerCookie("refreshToken");
      if (refreshToken) {
        try {
          const res = await fetch(`${baseURL}/auth/refresh`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token: refreshToken }),
          });
          if (res.ok) {
            const data = await res.json();
            await setServerCookie("serverAccessToken", data.accessToken);
            // No request retry logic here
          }
        } catch (refreshError) {
          console.log(refreshError);
        }
      }
    }
    return Promise.reject(error);
  }
);

type TypedAxiosInstance = {
  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
  post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T>;
  put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T>;
  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
} & AxiosInstance;

const http = axiosInstance as TypedAxiosInstance;

export default http;

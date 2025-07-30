// Interceptor
import Http from "../../interceptor";

// Dependencies

// Cookies
import { getClientCookie, setClientCookie } from "../storage/client-cookie";
import { getServerCookie, setServerCookie } from "../storage/server-cookie";

export const RefreshToken = async () => {
  const refreshToken = await getServerCookie("serverRefreshToken");
  try {
    const res = await Http.post(`/auth/refresh`, {
      token: refreshToken,
    });
    // If the user token expires and access to the site's features is denied, the user will be redirected to the login page.
    if (res.status === 403) {
      if (typeof window !== "undefined") {
        window.location.href = "/auth/login";
      }
      return;
    }

    if (res) {
      await setServerCookie("serverAccessToken", res.accessToken);
      setClientCookie("clientAccessToken", res.accessToken, 2);
      const clientCookie = getClientCookie("clientAccessToken");
      if (clientCookie == res.accessToken) {
        return true;
      } else {
        return false;
      }
    }
  } catch (error) {
    console.error("Error:", error);
    return Promise.reject(error);
  }
};

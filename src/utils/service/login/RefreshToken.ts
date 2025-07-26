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
        console.log("unauthorized")
        window.location.href = "/auth/login";
      }
      return;
    }

    if (res) {
      // console.log(res);
      // toast.success("refresh token successfully");
      await setServerCookie("serverAccessToken", res.accessToken);
      setClientCookie("clientAccessToken", res.accessToken, 2);
      console.log("ServerAccessToken: ", res.accessToken);
      const clientCookie = getClientCookie("clientAccessToken");
      if (clientCookie == res.accessToken) {
        console.log(true);
      } else {
        console.log(false);
      }
    }
  } catch (error) {
    console.error("Error:", error);
    return Promise.reject(error);
  }
};

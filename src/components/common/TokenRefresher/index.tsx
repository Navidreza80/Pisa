"use client";
import { getClientCookie } from "@/utils/service/storage/client-cookie";
import { RefreshToken } from "@/utils/service/login/RefreshToken";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export default function TokenRefresher() {
  const Token = getClientCookie("clientAccessToken");
  const decoded = typeof Token == "string" && jwtDecode<{ exp: number }>(Token);

  useEffect(() => {
    if (!Token || !decoded || !decoded.exp) return;

    const now = Math.floor(Date.now() / 1000);
    const twoMinutes = 2 * 60;
    const refreshTime = (decoded.exp - twoMinutes - now) * 1000;

    let timeoutId: NodeJS.Timeout;

    if (refreshTime > 0) {
      timeoutId = setTimeout(() => {
        RefreshToken();
      }, refreshTime);
    } else {
      RefreshToken();
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [Token, decoded]);

  return null;
}

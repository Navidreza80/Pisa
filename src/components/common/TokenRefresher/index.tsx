"use client";

import { getClientCookie } from "@/utils/service/storage/client-cookie";
import { RefreshToken } from "@/utils/service/login/RefreshToken";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export default function TokenRefresher() {
  const Token = getClientCookie("clientAccessToken");
  const decoded =
    typeof Token === "string" && jwtDecode<{ exp: number }>(Token);

  useEffect(() => {
    if (!Token || !decoded || !decoded.exp) return;

    const now = Math.floor(Date.now() / 1000);
    const expiry = decoded.exp;
    const isExpired = expiry <= now;

    // Call refresh immediately if already expired
    if (isExpired) {
      RefreshToken();
    }

    const interval = setInterval(
      () => {
        RefreshToken();
      },
      1 * 60 * 1000
    ); // Every 2 minutes

    return () => clearInterval(interval); // Clean up on unmount
  }, [Token, decoded]);

  return null;
}

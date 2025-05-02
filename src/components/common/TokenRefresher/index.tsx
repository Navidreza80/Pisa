"use client"
import { getClientCookie } from "@/utils/service/storage/client-cookie";
import { RefreshToken } from "@/utils/service/login/RefreshToken";
import { useEffect } from "react";

export default function TokenRefresher() {
  const Token = getClientCookie("clientAccessToken");
  
  useEffect(() => {
    console.log(document) 
    if (Token) {
      const intervalId = setInterval(() => {
        RefreshToken();
      }, 1000000000);

      // Clean up the interval on component unmount.
      return () => clearInterval(intervalId);
    }
  }, []);

  return null;
}

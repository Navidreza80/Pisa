"use server";

import { signIn, signOut } from "@/auth";
import postLogOut from "@/utils/service/logout/post";
import { deleteClientCookie } from "@/utils/service/storage/client-cookie";
import { deleteServerCookie } from "@/utils/service/storage/server-cookie";

export const login = async () => {
  await signIn("github", { redirectTo: "/" });
};

const logout = async () => {
  await signOut({ redirectTo: "/" });
};

export const handleLogout = async () => {
  await postLogOut();
  await deleteServerCookie("serverAccessToken");
  deleteClientCookie("clientAccessToken");
  await logout();
};

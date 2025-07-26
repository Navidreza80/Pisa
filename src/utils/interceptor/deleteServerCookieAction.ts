"use server"

import { deleteServerCookie } from "../service/storage/server-cookie";

export default async function deleteServerCookieAction(name: string) {
  await deleteServerCookie(name);
};

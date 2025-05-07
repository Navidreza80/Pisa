"use server"

import prisma from "../prisma";

export async function createUser(dbId: string, email: string, name?: string) {
  try {
    const user = await prisma.user.create({
      data: {
        dbId: dbId,
        email: email,
        name: name,
        isAdmin: false,
      },
      select: {
        id: true,
        email: true,
        name: true,
        isAdmin: true,
      },
    });

    return { success: true, user };
  } catch (error) {
    console.error("Error creating user:", error);
    return { success: false, error: "Failed to create user" };
  }
}

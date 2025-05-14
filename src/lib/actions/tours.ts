"use server";

import prisma from "@/lib/prisma";

export async function getTours() {
  try {
    const tours = await prisma.tour.findMany();

    return {
      tours,
      success: true,
    };
  } catch (e) {
    return { success: false, error: e };
  }
}

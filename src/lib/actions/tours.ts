"use server";
// Dependencies
import prisma from "@/lib/prisma";

/**
 * Server action to get all tours.
 * @return all tours.
 **/

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

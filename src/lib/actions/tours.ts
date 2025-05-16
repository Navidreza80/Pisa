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

    return tours
  } catch (e) {
    return { error: e };
  }
}

export async function getTourById(tourId: string) {
  try {
    const tour = await prisma.tour.findUnique({
      where: { id : tourId },
    });
    return tour
  } catch (error) {
    console.error("Error fetching city:", error);
    throw new Error("Failed to fetch city");
  }
}

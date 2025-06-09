"use server";
// Dependencies
import prisma from "@/lib/prisma";
import { RealEstate } from "@prisma/client";

/**
 * Server action to get all real estates.
 * @return all real estates.
 **/

export async function getRealEstates(): Promise<RealEstate[]> {
  try {
    const realEstates = await prisma.realEstate.findMany();

    return realEstates;
  } catch (e) {
    return { error: e };
  }
}

export async function getRealEstateById(realEstateId: string): Promise<RealEstate> {
  try {
    const realEstate = await prisma.realEstate.findUnique({
      where: { id: realEstateId },
    });
    return realEstate;
  } catch (error) {
    console.error("Error fetching real estate:", error);
    throw new Error("Failed to fetch real estate");
  }
}

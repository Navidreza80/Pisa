"use server";

import prisma from "@/lib/prisma";
import { Landscape } from "@prisma/client";

export async function getCityById(id: string) {
  try {
    const city = await prisma.city.findUnique({
      where: { id },
      include: {
        location: true,
        landscapes: true,
      },
    });

    if (!city) {
      return null;
    }

    return {
      ...city,
      location: {
        lat: city.location.lat,
        lng: city.location.lng,
      },
      landscapes: city.landscapes.map((landscape: Landscape) => ({
        id: landscape.id,
        cityId: landscape.cityId,
        name: landscape.name,
        image: landscape.image,
        description: landscape.description,
        lat: landscape.lat,
        lng: landscape.lng,
      })),
    };
  } catch (error) {
    console.error("Error fetching city:", error);
    throw new Error("Failed to fetch city");
  }
}

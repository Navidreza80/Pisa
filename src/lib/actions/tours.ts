"use server";
// Dependencies
import prisma from "@/lib/prisma";
import { toast } from "react-toastify";

/**
 * Server action to get all tours.
 * @return all tours.
 **/

export async function getTours() {
  try {
    const tours = await prisma.tour.findMany();

    return tours;
  } catch (e) {
    return { error: e };
  }
}

export async function getTourById(tourId: string) {
  try {
    const tour = await prisma.tour.findUnique({
      where: { id: tourId },
    });
    return tour;
  } catch (error) {
    console.error("Error fetching city:", error);
    throw new Error("Failed to fetch city");
  }
}

// Type for the tour data
interface CreateTourData {
  tourName: string;
  tourLocation: string;
  tourImage: string;
  tourDescription: string;
  tags?: string;
  price: any;
  startDate: Date;
  endDate?: Date;
  services: string[];
  facilities: string[];
  cancelTill: number;
  lat?: string;
  lng?: string;
  features: string[];
  schedule: any[];
}

export async function createTour(formData: CreateTourData) {
  try {

    // Create the tour in database
    const newTour = await prisma.tour.create({
      data: {
        tourName: formData.tourName,
        tourLocation: formData.tourLocation,
        tourImage: formData.tourImage,
        tourDescription: formData.tourDescription,
        tags: formData.tags[0],
        price: formData.price,
        startDate: formData.startDate,
        endDate: formData.endDate,
        services: formData.services,
        facilities: formData.facilities,
        cancelTill: formData.cancelTill,
        lat: formData.lat,
        lng: formData.lng,
        features: formData.features,
        schedule: formData.schedule,
      },
    });
    toast.success("تور با موفقیت ثبت شد.")
    return { success: true, tourId: newTour.id };
  } catch (error) {
    console.error("Failed to create tour:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create tour",
    };
  }
}

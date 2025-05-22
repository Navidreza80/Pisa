"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const registerForTour = async (formData: {
  fullName: string;
  phoneNumber: string;
  countOfPeople: string;
  email?: string;
  extraDescription?: string;
  tourId: string; // Ensure this is required
}) => {
  try {
    // Validate tourId exists
    if (!formData.tourId) {
      return {
        success: false,
        message: "شناسه تور معتبر نیست",
      };
    }

    // Verify the tour exists
    const tourExists = await prisma.tour.findUnique({
      where: { id: formData.tourId },
    });

    if (!tourExists) {
      return {
        success: false,
        message: "تور مورد نظر یافت نشد",
      };
    }

    // Check for existing registration
    const existingRegistration = await prisma.tourRegistration.findFirst({
      where: {
        phoneNumber: formData.phoneNumber,
        tourId: formData.tourId,
      },
    });

    if (existingRegistration) {
      return {
        success: false,
        message: "شما قبلاً با این شماره تلفن در این تور ثبت نام کرده‌اید",
      };
    }

    // Create new registration
    await prisma.tourRegistration.create({
      data: {
        fullName: formData.fullName,
        phoneNumber: formData.phoneNumber,
        countOfPeople: parseInt(formData.countOfPeople),
        email: formData.email || null,
        extraDescription: formData.extraDescription || null,
        tour: {
          connect: {
            id: formData.tourId,
          },
        },
      },
    });

    revalidatePath("/tours");
    return {
      success: true,
      message: "ثبت نام شما با موفقیت انجام شد. با شما تماس خواهیم گرفت",
    };
  } catch (error: any) {
    console.error("Registration Error:", error);

    if (error.code === "P2002") {
      return {
        success: false,
        message: "شما قبلاً در این تور ثبت نام کرده‌اید",
      };
    }

    return {
      success: false,
      message: error.message || "خطای ناشناخته در ثبت نام رخ داده است",
    };
  }
};

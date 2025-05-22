import { z } from "zod";

export const TourRegistrationSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" }),
  phoneNumber: z
    .string()
    .min(6, { message: "Please enter a valid phone number" }),
  countOfPeople: z
    .number()
    .min(1, { message: "At least 1 person is required" }),
  email: z.string().email().optional().or(z.literal("")),
  extraDescription: z.string().optional(),
  tourId: z.string().min(1, { message: "Tour ID is required" }),
});

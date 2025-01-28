import { z } from "zod";

export const addressSchema = z.object({
    currentCountry: z.string().min(1, "Current country name is required"),
    currentCity: z.string().min(1, "Current city name is required"),
    currentStreet: z.string().min(1, "Current address is required"),
    permanentCountry: z.string().min(1, "Permanent country name is required"),
    permanentCity: z.string().min(1, "Permanent city name is required"),
    permanentStreet: z.string().min(1, "Permanent address is required"),
});
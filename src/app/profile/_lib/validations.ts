import { z } from "zod";

export const updateProfileSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  phone: z.string().optional().nullable(),
  titleId: z.string().optional().nullable(),
  address: z
    .object({
      street: z.string().min(1, "Street is required"),
      subdistrict: z.string().min(1, "Subdistrict is required"),
      district: z.string().min(1, "District is required"),
      province: z.string().min(1, "Province is required"),
      postalCode: z.string().regex(/^\d{5}$/, "Postal code must be 5 digits"),
    })
    .optional()
    .nullable(),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;

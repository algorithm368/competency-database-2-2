"use server";

import { revalidatePath } from "next/cache";
import { authPrisma } from "@/lib/prisma-auth";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { updateProfileSchema, UpdateProfileInput } from "./validations";

type ActionResult<T = void> = {
  success: boolean;
  message: string;
  data?: T;
  errors?: Record<string, string[]>;
};

export async function updateProfile(
  input: UpdateProfileInput
): Promise<ActionResult> {
  try {
    // Get current user session
    const requestHeaders = await headers();
    const session = await auth.api.getSession({
      headers: requestHeaders,
    });

    if (!session?.user) {
      return {
        success: false,
        message: "Unauthorized. Please log in.",
      };
    }

    // Validate input
    const validation = updateProfileSchema.safeParse(input);
    if (!validation.success) {
      return {
        success: false,
        message: "Validation failed",
        errors: validation.error.flatten().fieldErrors,
      };
    }

    const { name, phone, titleId, address } = validation.data;

    // Update user in transaction
    await authPrisma.$transaction(async (tx) => {
      // Update basic user info
      await tx.user.update({
        where: { id: session.user.id },
        data: {
          name,
          phone,
          titleId,
          updatedAt: new Date(),
        },
      });

      // Handle address
      if (address) {
        const existingAddress = await tx.address.findUnique({
          where: { userId: session.user.id },
        });

        if (existingAddress) {
          // Update existing address
          await tx.address.update({
            where: { userId: session.user.id },
            data: address,
          });
        } else {
          // Create new address
          await tx.address.create({
            data: {
              ...address,
              userId: session.user.id,
            },
          });
        }
      } else {
        // Delete address if it exists and input is null
        await tx.address.deleteMany({
          where: { userId: session.user.id },
        });
      }
    });

    // Revalidate the profile page
    revalidatePath("/profile");

    return {
      success: true,
      message: "Profile updated successfully!",
    };
  } catch (error) {
    console.error("Error updating profile:", error);
    return {
      success: false,
      message: "Failed to update profile. Please try again.",
    };
  }
}

"use server";

import { revalidatePath } from "next/cache";
import { authPrisma } from "@/lib/prisma-auth";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { updateProfileSchema, UpdateProfileInput } from "./validations";
import { Prisma } from "@/lib/prisma-auth";

type ActionResult<T = void> = {
  success: boolean;
  message: string;
  data?: T;
  errors?: Record<string, string[]>;
};

export async function updateProfile(
  input: UpdateProfileInput,
): Promise<ActionResult> {
  try {
    const requestHeaders = await headers();
    const session = await auth.api.getSession({ headers: requestHeaders });

    if (!session?.user) {
      return { success: false, message: "Unauthorized. Please log in." };
    }

    const validation = updateProfileSchema.safeParse(input);
    if (!validation.success) {
      return {
        success: false,
        message: "Validation failed",
        errors: validation.error.flatten().fieldErrors,
      };
    }

    const { name, phone, address } = validation.data;

    await authPrisma.$transaction(async (tx: Prisma.TransactionClient) => {
      await tx.user.update({
        where: { id: session.user.id },
        data: { name, phone, updatedAt: new Date() },
      });

      if (address) {
        const existingAddress = await tx.address.findUnique({
          where: { userId: session.user.id },
        });

        if (existingAddress) {
          await tx.address.update({
            where: { userId: session.user.id },
            data: address,
          });
        } else {
          await tx.address.create({
            data: { ...address, userId: session.user.id },
          });
        }
      } else {
        await tx.address.deleteMany({
          where: { userId: session.user.id },
        });
      }
    });

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

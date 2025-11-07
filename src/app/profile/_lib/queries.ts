import { authPrisma } from "@/lib/prisma-auth";
import { UserWithRelations } from "./types";

export async function getUserProfile(
  userId: string,
): Promise<UserWithRelations | null> {
  return authPrisma.user.findUnique({
    where: { id: userId },
    include: {
      address: true,
    },
  });
}

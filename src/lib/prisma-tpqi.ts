import { PrismaClient } from ".prisma/tpqi/client";

const globalForPrisma = globalThis as unknown as {
  tpqiPrisma: PrismaClient | undefined;
};

export const tpqiPrisma = globalForPrisma.tpqiPrisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.tpqiPrisma = tpqiPrisma;
}

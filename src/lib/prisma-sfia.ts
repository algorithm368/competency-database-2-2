import { PrismaClient } from ".prisma/sfia/client";

const globalForPrisma = globalThis as unknown as {
  sfiaPrisma: PrismaClient | undefined;
};

export const sfiaPrisma = globalForPrisma.sfiaPrisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.sfiaPrisma = sfiaPrisma;
}

export { Prisma } from ".prisma/sfia/client";

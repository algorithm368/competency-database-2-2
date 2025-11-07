import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from ".prisma/auth/client";

const authPrisma = new PrismaClient();

export const auth = betterAuth({
  database: prismaAdapter(authPrisma, { provider: "sqlite" }), // use sqlite, not postgresql
  trustedOrigins: ["http://localhost:3000"],
  emailAndPassword: { enabled: false },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
  },
});

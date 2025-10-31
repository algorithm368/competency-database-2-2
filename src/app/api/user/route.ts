import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { PrismaClient } from "../../../../node_modules/.prisma/auth";

import { auth } from "@/lib/auth";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Must await headers() — it's async in Next.js 14.2+
    const requestHeaders = await headers();

    const session = await auth.api.getSession({
      headers: requestHeaders,
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: {
        title: true,
        address: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

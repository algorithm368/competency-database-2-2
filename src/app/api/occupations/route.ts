import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q"); // e.g. /api/occupations?q=ช่าง

  try {
    const occupations = await prisma.occupation.findMany({
      where: q
        ? {
            name: {
              contains: q,
            },
          }
        : undefined,
      select: {
        id: true,
        name: true,
      },
      take: 20,
    });

    return NextResponse.json(occupations);
  } catch (error) {
    console.error("Error fetching occupations:", error);
    return NextResponse.json(
      { error: "Failed to fetch occupations" },
      { status: 500 }
    );
  }
}

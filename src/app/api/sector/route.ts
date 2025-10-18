import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const sectors = await prisma.sector.findMany({
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        name: "asc",
      },
    });
    return NextResponse.json(sectors);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch sectors" },
      { status: 500 }
    );
  }
}

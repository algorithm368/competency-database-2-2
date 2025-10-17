import fs from "fs";
import csv from "csv-parser";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config(); // load .env

const prisma = new PrismaClient();

async function main() {
  const levels: { id: number; name: string }[] = [];

  fs.createReadStream("scripts/data/level.csv")
    .pipe(csv())
    .on("data", (data) => {
      levels.push({
        id: Number(data.level_id),
        name: data.level_name,
      });
    })
    .on("end", async () => {
      try {
        // Use upsert to avoid duplicates
        for (const level of levels) {
          await prisma.level.upsert({
            where: { id: level.id },
            update: {}, // do nothing if exists
            create: level,
          });
        }

        console.log("Levels imported successfully!");
      } catch (err) {
        console.error("Error inserting levels:", err);
      } finally {
        await prisma.$disconnect();
      }
    });
}

main().catch((err) => {
  console.error("Unexpected error:", err);
  prisma.$disconnect();
});

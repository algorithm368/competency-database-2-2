import fs from "fs";
import csv from "csv-parser";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

async function main() {
  const sectors: { name: string }[] = [];

  fs.createReadStream("scripts/data/sector.csv")
    .pipe(csv())
    .on("data", (data) => {
      sectors.push({ name: data.sector_name });
    })
    .on("end", async () => {
      try {
        for (const sector of sectors) {
          await prisma.sector.upsert({
            where: { name: sector.name },
            update: {},
            create: { name: sector.name },
          });
          console.log(`Inserted/Updated: ${sector.name}`);
        }
        console.log("Sectors imported successfully!");
      } catch (err) {
        console.error("Error inserting sectors:", err);
      } finally {
        await prisma.$disconnect();
      }
    });
}

main().catch(async (err) => {
  console.error("Unexpected error:", err);
  await prisma.$disconnect();
});

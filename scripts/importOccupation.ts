import fs from "fs";
import csv from "csv-parser";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

async function main() {
  const occupations: { name: string }[] = [];

  fs.createReadStream("scripts/data/occupation.csv")
    .pipe(csv())
    .on("data", (data) => {
      occupations.push({ name: data.occupation_name });
    })
    .on("end", async () => {
      try {
        for (const occ of occupations) {
          await prisma.occupation.upsert({
            where: { name: occ.name }, // use unique name to upsert
            update: {}, // do nothing if exists
            create: { name: occ.name },
          });
        }

        console.log("Occupations imported successfully!");
      } catch (err) {
        console.error("Error inserting occupations:", err);
      } finally {
        await prisma.$disconnect();
      }
    });
}

main().catch((err) => {
  console.error("Unexpected error:", err);
  prisma.$disconnect();
});

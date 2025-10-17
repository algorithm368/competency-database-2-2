import fs from "fs";
import csv from "csv-parser";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config(); // load .env

const prisma = new PrismaClient();

async function main() {
  const branchs: { id: number; name: string }[] = [];

  fs.createReadStream("scripts/data/branchs.csv")
    .pipe(csv({ skipLines: 0, mapHeaders: ({ header }) => header.trim() })) // trim headers
    .on("data", (data) => {
      branchs.push({
        id: Number(data.branch_id),
        name: data.branch_name,
      });
    })
    .on("end", async () => {
      try {
        for (const branch of branchs) {
          await prisma.branch.upsert({
            where: { id: branch.id },
            update: {}, // do nothing if exists
            create: branch,
          });
        }

        console.log("Branches imported successfully!");
      } catch (err) {
        console.error("Error inserting branches:", err);
      } finally {
        await prisma.$disconnect();
      }
    });
}

main().catch((err) => {
  console.error("Unexpected error:", err);
  prisma.$disconnect();
});

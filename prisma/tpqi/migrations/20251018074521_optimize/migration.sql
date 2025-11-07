-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Qualification" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sectorId" INTEGER,
    "branchId" INTEGER,
    "occupationId" INTEGER,
    "levelId" INTEGER,
    CONSTRAINT "Qualification_sectorId_fkey" FOREIGN KEY ("sectorId") REFERENCES "Sector" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Qualification_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Qualification_occupationId_fkey" FOREIGN KEY ("occupationId") REFERENCES "Occupation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Qualification_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "Level" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Qualification" ("branchId", "id", "levelId", "occupationId", "sectorId") SELECT "branchId", "id", "levelId", "occupationId", "sectorId" FROM "Qualification";
DROP TABLE "Qualification";
ALTER TABLE "new_Qualification" RENAME TO "Qualification";
CREATE INDEX "Qualification_sectorId_idx" ON "Qualification"("sectorId");
CREATE INDEX "Qualification_branchId_idx" ON "Qualification"("branchId");
CREATE INDEX "Qualification_occupationId_idx" ON "Qualification"("occupationId");
CREATE INDEX "Qualification_levelId_idx" ON "Qualification"("levelId");
CREATE UNIQUE INDEX "Qualification_sectorId_branchId_occupationId_levelId_key" ON "Qualification"("sectorId", "branchId", "occupationId", "levelId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

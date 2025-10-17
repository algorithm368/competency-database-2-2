/*
  Warnings:

  - The primary key for the `BranchToOccupation` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_BranchToOccupation" (
    "occupationId" INTEGER NOT NULL,
    "branchId" INTEGER NOT NULL,

    PRIMARY KEY ("occupationId", "branchId"),
    CONSTRAINT "BranchToOccupation_occupationId_fkey" FOREIGN KEY ("occupationId") REFERENCES "Occupation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "BranchToOccupation_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_BranchToOccupation" ("branchId", "occupationId") SELECT "branchId", "occupationId" FROM "BranchToOccupation";
DROP TABLE "BranchToOccupation";
ALTER TABLE "new_BranchToOccupation" RENAME TO "BranchToOccupation";
CREATE INDEX "BranchToOccupation_branchId_idx" ON "BranchToOccupation"("branchId");
CREATE INDEX "BranchToOccupation_occupationId_idx" ON "BranchToOccupation"("occupationId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

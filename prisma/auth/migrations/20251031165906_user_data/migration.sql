/*
  Warnings:

  - You are about to drop the column `twoFactorEnabled` on the `user` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "address" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "street" TEXT NOT NULL,
    "subdistrict" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "userId" TEXT,
    CONSTRAINT "address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Title" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_account" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "accountId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "idToken" TEXT,
    "accessTokenExpiresAt" DATETIME,
    "refreshTokenExpiresAt" DATETIME,
    "scope" TEXT,
    "password" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_account" ("accessToken", "accessTokenExpiresAt", "accountId", "createdAt", "id", "idToken", "password", "providerId", "refreshToken", "refreshTokenExpiresAt", "scope", "updatedAt", "userId") SELECT "accessToken", "accessTokenExpiresAt", "accountId", "createdAt", "id", "idToken", "password", "providerId", "refreshToken", "refreshTokenExpiresAt", "scope", "updatedAt", "userId" FROM "account";
DROP TABLE "account";
ALTER TABLE "new_account" RENAME TO "account";
CREATE INDEX "account_userId_idx" ON "account"("userId");
CREATE UNIQUE INDEX "account_accountId_providerId_key" ON "account"("accountId", "providerId");
CREATE TABLE "new_session" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "token" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expiresAt" DATETIME NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_session" ("createdAt", "expiresAt", "id", "ipAddress", "token", "updatedAt", "userAgent", "userId") SELECT "createdAt", "expiresAt", "id", "ipAddress", "token", "updatedAt", "userAgent", "userId" FROM "session";
DROP TABLE "session";
ALTER TABLE "new_session" RENAME TO "session";
CREATE UNIQUE INDEX "session_token_key" ON "session"("token");
CREATE INDEX "session_userId_idx" ON "session"("userId");
CREATE TABLE "new_user" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "titleId" TEXT,
    "phone" TEXT,
    "email" TEXT NOT NULL,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "image" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "user_titleId_fkey" FOREIGN KEY ("titleId") REFERENCES "Title" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_user" ("createdAt", "email", "emailVerified", "id", "image", "name", "updatedAt") SELECT "createdAt", "email", "emailVerified", "id", "image", "name", "updatedAt" FROM "user";
DROP TABLE "user";
ALTER TABLE "new_user" RENAME TO "user";
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "address_userId_key" ON "address"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Title_name_key" ON "Title"("name");

-- CreateIndex
CREATE INDEX "verification_identifier_idx" ON "verification"("identifier");

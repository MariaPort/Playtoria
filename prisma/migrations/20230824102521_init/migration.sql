/*
  Warnings:

  - You are about to drop the column `newField` on the `Link` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Link" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url" TEXT NOT NULL,
    "storeType" TEXT NOT NULL,
    "appId" TEXT NOT NULL,
    "isScraped" INTEGER NOT NULL
);
INSERT INTO "new_Link" ("appId", "id", "isScraped", "storeType", "url") SELECT "appId", "id", "isScraped", "storeType", "url" FROM "Link";
DROP TABLE "Link";
ALTER TABLE "new_Link" RENAME TO "Link";
CREATE UNIQUE INDEX "Link_url_key" ON "Link"("url");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

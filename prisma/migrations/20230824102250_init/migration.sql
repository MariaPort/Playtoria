/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Game` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Game" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "appId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "publisherName" TEXT NOT NULL,
    "publisherId" TEXT,
    "categoryName" TEXT,
    "storeType" TEXT NOT NULL,
    "storeUrl" TEXT NOT NULL,
    "sensotowerUrl" TEXT,
    "appmagicUrl" TEXT,
    "storespyUrl" TEXT NOT NULL,
    "locations" TEXT,
    "price" INTEGER NOT NULL,
    "icon" TEXT NOT NULL,
    "releaseDate" TEXT NOT NULL,
    "gallery" TEXT,
    "isActive" INTEGER NOT NULL,
    "downloads" INTEGER,
    "revenue" INTEGER,
    "isHypercasual" INTEGER
);
INSERT INTO "new_Game" ("appId", "appmagicUrl", "downloads", "gallery", "icon", "id", "isActive", "isHypercasual", "locations", "name", "price", "publisherId", "publisherName", "releaseDate", "revenue", "sensotowerUrl", "storeType", "storeUrl", "storespyUrl") SELECT "appId", "appmagicUrl", "downloads", "gallery", "icon", "id", "isActive", "isHypercasual", "locations", "name", "price", "publisherId", "publisherName", "releaseDate", "revenue", "sensotowerUrl", "storeType", "storeUrl", "storespyUrl" FROM "Game";
DROP TABLE "Game";
ALTER TABLE "new_Game" RENAME TO "Game";
CREATE UNIQUE INDEX "Game_appId_key" ON "Game"("appId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

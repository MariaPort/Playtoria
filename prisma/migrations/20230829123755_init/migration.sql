-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Game" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "appId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "publisherName" TEXT,
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
INSERT INTO "new_Game" ("appId", "appmagicUrl", "categoryName", "downloads", "gallery", "icon", "id", "isActive", "isHypercasual", "locations", "name", "price", "publisherId", "publisherName", "releaseDate", "revenue", "sensotowerUrl", "storeType", "storeUrl", "storespyUrl") SELECT "appId", "appmagicUrl", "categoryName", "downloads", "gallery", "icon", "id", "isActive", "isHypercasual", "locations", "name", "price", "publisherId", "publisherName", "releaseDate", "revenue", "sensotowerUrl", "storeType", "storeUrl", "storespyUrl" FROM "Game";
DROP TABLE "Game";
ALTER TABLE "new_Game" RENAME TO "Game";
CREATE UNIQUE INDEX "Game_appId_key" ON "Game"("appId");
CREATE TABLE "new_Link" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url" TEXT NOT NULL,
    "storeType" TEXT NOT NULL,
    "appId" TEXT NOT NULL,
    "isScraped" INTEGER NOT NULL,
    "hasBadData" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_Link" ("appId", "id", "isScraped", "storeType", "url") SELECT "appId", "id", "isScraped", "storeType", "url" FROM "Link";
DROP TABLE "Link";
ALTER TABLE "new_Link" RENAME TO "Link";
CREATE UNIQUE INDEX "Link_url_key" ON "Link"("url");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

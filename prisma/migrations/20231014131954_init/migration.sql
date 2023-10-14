-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Link" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url" TEXT NOT NULL,
    "storeType" TEXT NOT NULL,
    "appId" TEXT NOT NULL,
    "isScraped" INTEGER NOT NULL,
    "hasBadData" INTEGER NOT NULL DEFAULT 0,
    "updateDate" TEXT NOT NULL DEFAULT '2023-08-25T00:00:00.000Z'
);
INSERT INTO "new_Link" ("appId", "hasBadData", "id", "isScraped", "storeType", "url") SELECT "appId", "hasBadData", "id", "isScraped", "storeType", "url" FROM "Link";
DROP TABLE "Link";
ALTER TABLE "new_Link" RENAME TO "Link";
CREATE UNIQUE INDEX "Link_url_key" ON "Link"("url");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

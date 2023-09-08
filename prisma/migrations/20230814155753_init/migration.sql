-- CreateTable
CREATE TABLE "Game" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "appId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "publisherName" TEXT NOT NULL,
    "publisherId" TEXT,
    "categoryId" INTEGER,
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

-- CreateTable
CREATE TABLE "Link" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url" TEXT NOT NULL,
    "storeType" TEXT NOT NULL,
    "appId" TEXT NOT NULL,
    "isScraped" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Game_appId_key" ON "Game"("appId");

-- CreateIndex
CREATE UNIQUE INDEX "Link_url_key" ON "Link"("url");

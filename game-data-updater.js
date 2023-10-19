const axios = require('axios');
const cheerio = require('cheerio');
const {PrismaClient} = require('@prisma/client');
const {
    sleep,
    formatAppMagicLink,
    formatSensorTowerLink,
} = require('./utils.js');

const prisma = new PrismaClient();

const updateGamesData = async (newLinksAdded) => {
    const getGameLinksfromDB = async (howMany) => {
        try {
            const gameLinks = await prisma.link.findMany({
                where: {
                    isScraped: 0,
                    hasBadData: 0
                },
                take: howMany,
              })

            return gameLinks;
        } catch (error) {
            console.log(error.message);
        } finally {
            await prisma.$disconnect();
            await sleep(700);
        }
    };

    const updateGameLinksInDB = async (linksData) => {
        const inserts = [];

        linksData.forEach(async linkData => {
            inserts.push(prisma.link.update({
                where: {url: linkData.url},
                data: {...linkData},
            }));
        });
        
        try {
            await prisma.$transaction(inserts);
        } catch (error) {
            console.log(error.message);
        } finally {
            await prisma.$disconnect();
            await sleep(300);
            console.log("transaction UPDATE LINKS complete");
        }
    }

    const extractGamesData = async (gameLink) => {
        const response = await axios.get(gameLink.url);
        const html = response.data;

        const $ = cheerio.load(html);

        const source = $('script:contains("@context")');
        let sourceData = {};

        try {
            sourceData = JSON.parse(source[0].children[0].data);
        } catch (error) {
            console.error(error);
        }

        const description = sourceData.description; // $('[data-test-id="app-description"]').text();
        const name = sourceData.name; // $('h1').text();
        const publisherName = sourceData.author.name; // $('body > div:nth-child(1) > main > div.space-y-6.mt-6 > astro-island > div > div > div:nth-child(1) > span > div > div > a').text();
        const categoryName = $('div[data-cy="app-profile-info-app-category"]:nth-child(2) > span > div > a').text();
        const storeType = gameLink.storeType;
        const storeUrl = $('div[data-cy="app-profile-info-store"] > span > div > div > a').attr('href');
        const sensotowerUrl = formatSensorTowerLink(gameLink);
        const appmagicUrl = formatAppMagicLink(gameLink);
        // const locations = ''; // JSON.stringify(sourceData.screenshots);
        const price = Number(sourceData.offers.price) || 0;
        const icon = sourceData.image;
        const releaseDate = sourceData.datePublished;
        const gallery = JSON.stringify(sourceData.screenshots);
        const isActive = $('span:contains("App is deprecated.")').length === 0 ? 1 : 0;
        // const downloads = $('div[data-test-id="app-download"] > span:nth-child(2)').text();
        // const revenue = $('div[data-test-id="app-revenue"] > span:nth-child(2)').text();
        
        const gameData = {
            description,
            appId: gameLink.appId,
            name,
            publisherName,
            categoryName,
            storeType,
            storeUrl,
            sensotowerUrl,
            appmagicUrl,
            storespyUrl: gameLink.url,
            // locations,
            price,
            icon,
            releaseDate,
            gallery,
            isActive,
            // downloads,
            // revenue,
        };

        return gameData;
    }

    const collectGamesData = async (gameLinks) => {
        const gameDataPromises = [];

        for (const gameLink of gameLinks) {
            console.log("CURRENT gameLink: " + gameLink.url);
            gameDataPromises.push(extractGamesData(gameLink));
        }
        
        try {
            const results = await Promise.allSettled(gameDataPromises);
            console.log('RESULTS');
            console.log(results);

            return results
                .filter(result => result.status === 'fulfilled')
                .map(result => result.value);
        } catch (error) {
            console.log("Error while extracting " + error);
        }
    };

    const insertNewGamesDataToDB = async gamesData => {
        const inserts = [];

        gamesData.forEach(async gameData => {
            try {
                inserts.push(prisma.game.create({
                    data: {...gameData},
                }));
            } catch (error) {
                inserts.push(prisma.game.update({
                    where: {appId: gameData.appId},
                    data: {...gameData},
                }));
            }
        });
        
        try {
            await prisma.$transaction(inserts);
        } catch (error) {
            console.log(error.message);
        } finally {
            await prisma.$disconnect();
            await sleep(700);
            console.log("transaction CREATE GAMEDATA complete");
        }
    };

    const startScrapingGameData = async (newLinksAdded) => {
        const delay = 1000;
        const howMany = 10;
        const itterations = Math.ceil(newLinksAdded / 10);
        let itterationsCount = 0;
        
        const requestLoop = async () => {
            const gameLinks = await getGameLinksfromDB(howMany);
            const gamesData = await collectGamesData(gameLinks);

            try {
                await insertNewGamesDataToDB(gamesData);
            
                const updatedGameLinks = gameLinks.map(gameLink => {
                    const hasResult = gamesData.find(gameData => gameData.appId === gameLink.appId);

                    if (hasResult) {
                        return {
                            ...gameLink,
                            isScraped: 1,
                            hasBadData: 0
                        }
                    } else {
                        return {
                            ...gameLink,
                            hasBadData: 1
                        }
                    }
                });

                await updateGameLinksInDB(updatedGameLinks);
            } catch (error) {
                console.log("Error while adding to BD " + error);
            }            

            itterationsCount++;

            if (itterationsCount < itterations) {
                await sleep(delay);
                await requestLoop();
            } else {
                console.log('UPDATE COMPLETED!')
            }
        };
    
        await requestLoop();
    }

    startScrapingGameData(newLinksAdded);
};

module.exports = {updateGamesData}

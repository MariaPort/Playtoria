/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
const axios = require('axios');
const cheerio = require('cheerio');
const { PrismaClient } = require('@prisma/client');
const { sleep } = require('./utils');
const { updateGamesData } = require('./game-data-updater');

const prisma = new PrismaClient();

const updateXMLLinks = async () => {
  const numberOfItterations = 5;
  let newLinksAdded = 0;

  const extractGameLinksXml = (xml) => {
    const $ = cheerio.load(xml, {
      xmlMode: true,
    });

    const urls = $('loc').toArray().map((x) => x.children[0].data);
    const filtredUrls = urls.filter((x) => /(ios|android)\/[a-z]{2}\/game/.test(x));
    const data = filtredUrls.map((x) => ({
      url: x,
      storeType: /ios/.test(x) ? 'appstore' : 'googleplay',
      appId: x.match(/\/([a-zA-Z0-9_.]+)$/)[1],
    }));

    return data;
  };

  const getSitemapLinks = async () => {
    const response = await axios.get('https://storespy.net/sitemap.xml');
    const mainXml = response.data;

    const $ = cheerio.load(mainXml, {
      xmlMode: true,
    });

    return $('loc').toArray().map((x) => x.children[0].data);
  };

  const checkIfItIsInBase = async (url) => {
    const data = await prisma.link.findUnique({
      where: { url },
    });

    return !!data;
  };

  const insertNewGameLinksToDB = async (linksData) => {
    const inserts = [];

    for (let i = 0; i < linksData.length; i++) {
      const linkData = linksData[i];
      const itIsInBase = await checkIfItIsInBase(linkData.url);

      if (!itIsInBase) {
        newLinksAdded++;

        inserts.push(prisma.link.create({
          data: {
            url: linkData.url,
            storeType: linkData.storeType,
            appId: linkData.appId,
            updateDate: new Date().toISOString(),
            isScraped: 0,
            hasBadData: 0,
          },
        }));
      }
    }

    try {
      await prisma.$transaction(inserts);
    } catch (error) {
      console.log(error.message);
    } finally {
      await prisma.$disconnect();
      await sleep(700);
      console.log('updateXMLLinks transaction complete');
    }
  };

  const startScrapingGameLinks = async (sitemapLinks) => {
    const delay = 3000;
    let currentLinkIndex = 1;

    const requestLoop = async () => {
      const response = await axios.get(sitemapLinks[currentLinkIndex]);
      const xml = response.data;

      const linksData = extractGameLinksXml(xml);
      await insertNewGameLinksToDB(linksData);

      currentLinkIndex++;

      if (currentLinkIndex <= numberOfItterations) {
        await setTimeout(() => {
          requestLoop();
        }, delay);
      } else {
        await updateGamesData(newLinksAdded);
      }
    };

    await requestLoop();
  };

  const sitemapLinks = await getSitemapLinks();
  await startScrapingGameLinks(sitemapLinks);
};

module.exports = { updateXMLLinks };

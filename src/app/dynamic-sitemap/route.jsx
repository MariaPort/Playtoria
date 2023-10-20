import {getServerSideSitemapIndex} from 'next-sitemap'
import {getGamesDataIdsCount} from '../../actions';

// loc: `https://playtoria/overview/${appId}.com`,

const URLS_PER_SITEMAP = 10000;

export async function GET (request) {
  console.log(request);

  const idsCount = await getGamesDataIdsCount();
  const amountOfSitemapFiles = Math.ceil(idsCount / URLS_PER_SITEMAP);

  const sitemaps = Array(amountOfSitemapFiles)
    .fill('')
    .map((v, index) => `https://playtoria.com/dynamic-sitemap-${index}.xml`);

  return getServerSideSitemapIndex(sitemaps);
};

// export default function GamesSitemapIndexPage() {}
import {getServerSideSitemap} from 'next-sitemap'
import {getGamesDataIdsBatch} from '../../../actions';

const URLS_PER_SITEMAP = 10000;

export async function GET (request, context) {
  console.log(context.params.page);
  console.log(isNaN(Number(context.params.page)));
  if (!context.params.page || isNaN(Number(context.params.page))) {
    return { notFound: true };
  }

  const page = Number(context.params.page);

  console.log(page);
  const gamesData = await getGamesDataIdsBatch(URLS_PER_SITEMAP, URLS_PER_SITEMAP * page);

  if (gamesData.length === 0) {
    return { notFound: true };
  }

  const fields = gamesData.map(({appId}) => ({
    loc: `www.playtoria.com/overview/${appId}`
  }));

  return getServerSideSitemap(fields);
};

// export default function GamesSitemapPage() {}
import { getServerSideSitemap } from 'next-sitemap';
import { getGamesDataIdsBatch } from '../../../actions';

const URLS_PER_SITEMAP = 10000;

export default async function GET(request, context) {
  if (!context.params.page || Number.isNaN(Number(context.params.page))) {
    return { notFound: true };
  }

  const page = Number(context.params.page);

  const gamesData = await getGamesDataIdsBatch(URLS_PER_SITEMAP, URLS_PER_SITEMAP * page);

  if (gamesData.length === 0) {
    return { notFound: true };
  }

  const fields = gamesData.map(({ appId }) => ({
    loc: `https://playtoria.com/overview/${appId}`,
  }));

  return getServerSideSitemap(fields);
}

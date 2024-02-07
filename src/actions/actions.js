'use server';

import * as React from 'react';
import { prisma } from '../db';
import { ITEMS_PER_PAGE } from '../app/constants';

const containsSearchFromString = (string) => string.split(' ').map((substr) => ({
  name: {
    contains: substr,
  },
}));

export const searchGamesData = async (pagination, searchData = null) => {
  let gamesData = [];
  let countResponse = {};
  const skipValue = pagination.page > 1 ? (pagination.page - 1) * ITEMS_PER_PAGE : 0;

  const selectQuery = {
    where: {
      AND: [
        ...(searchData.name ? [...containsSearchFromString(searchData.name)] : []),
        searchData.publisherName ? { publisherName: { contains: searchData.publisherName } } : {},
        searchData.description ? { description: { contains: searchData.description } } : {},
        searchData.storeType && searchData.storeType !== 'all' ? { storeType: { contains: searchData.storeType } } : {},
        searchData.category && searchData.category !== 'all' ? { categoryName: { contains: searchData.category } } : {},
        searchData.startDate || searchData.endDate
          ? {
            releaseDate: {
              ...searchData.startDate ? { gte: searchData.startDate } : {},
              ...searchData.endDate ? { lte: searchData.endDate } : {},
            },
          }
          : {},
      ],
    },
  };

  if (searchData && Object.keys(searchData).length !== 0) {
    gamesData = await prisma.game.findMany({
      // orderBy: {
      //     releaseDate: 'desc',
      // },
      skip: skipValue,
      take: ITEMS_PER_PAGE,
      ...selectQuery,
    });

    countResponse = await prisma.game.aggregate({
      _count: {
        id: true,
      },
      ...selectQuery,
    });
  } else {
    gamesData = await prisma.game.findMany({
      orderBy: {
        releaseDate: 'desc',
      },
      skip: skipValue,
      take: ITEMS_PER_PAGE,
    });
    countResponse = await prisma.game.aggregate({
      _count: {
        id: true,
      },
    });
  }

  return {
    data: gamesData,
    total: countResponse._count.id,
  };
};

export const searchGameDataById = React.cache(async (appId) => {
  const data = await prisma.game.findMany({
    where: { appId },
  });

  return data;
});

export const getGamesDataIdsBatch = React.cache(async (take, skip) => {
  const ids = await prisma.game.findMany({
    select: {
      appId: true,
    },
    take,
    skip,
  });

  return ids;
});

export const getGamesDataIdsCount = React.cache(async () => {
  const idsCount = await prisma.game.count();

  return idsCount;
});

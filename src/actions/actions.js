'use server';

import * as React from 'react';
import {prisma} from '@/db';
import {ITEMSPERPAGE} from '../app/constants';

export const searchGamesData = React.cache(async (searchData = null, pagination) => {
    let gamesData = [];
    let countResponse = {};
    const skipValue = pagination.page > 1 ? (pagination.page || 1) * ITEMSPERPAGE : 0;

    const selectQuery = {
        where: {
            AND: [
                searchData.name ? {name: {contains: searchData.name}} : {},
                searchData.publisherName ? {publisherName: {contains: searchData.publisherName}} : {},
                searchData.description ? {description: {contains: searchData.description}} : {},
                searchData.storeType && searchData.storeType !== 'all' ? {storeType: {contains: searchData.storeType}} : {},
                searchData.category ? {categoryName: {contains: searchData.category}} : {},
                searchData.startDate ||  searchData.endDate 
                    ? {
                        releaseDate: {
                            ...searchData.startDate ? {gte: searchData.startDate} : {},
                            ...searchData.endDate ? {lte: searchData.endDate} : {}
                        }
                    }
                    : {}
            ]        
        }
    };

    if(searchData || Object.keys(searchData).length !== 0) {
        gamesData = await prisma.game.findMany({
            skip: skipValue,
            take: ITEMSPERPAGE,
            ...selectQuery,
        });

        countResponse = await prisma.game.aggregate({
            _count: {
                id: true           
            },
            ...selectQuery
        });
    } else {
        gamesData = await prisma.game.findMany({
            skip: skipValue,
            take: 100
        });
        countResponse = await prisma.game.aggregate({
            _count: {
                id: true           
            }
        });
    }
    
    return {
        data: gamesData,
        total: countResponse._count.id
    };
});

export const searchGameDataById = React.cache(async (appId) => {
    const data = await prisma.game.findMany({
        where: {appId}
    });
    
    return data;
});

export const getGamesDataIdsBatch = React.cache(async (take, skip) => {
    const ids = await prisma.game.findMany({
        select: {
            appId: true
        },
        take,
        skip
    });
    
    return ids;
});

export const getGamesDataIdsCount = React.cache(async () => {
    const idsCount = await prisma.game.count();
    
    return idsCount;
});
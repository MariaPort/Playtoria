"use client"

import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import {GameCard} from '../GameCard';

export function GamesList({
  gamesData,
  isScreenshotsShown,
}) {

  return (
      <List 
        sx={{
          maxWidth: '850px',
          paddingTop: '0'
        }}>
        {
          gamesData.length > 0
          ? gamesData.map(gameData => 
              (
                <ListItem
                  key={gameData.id}
                  sx={{
                    paddingTop: '0',
                    paddingLeft: {xs: '0'},
                    paddingRight: {xs: '0'}
                  }}
                >
                  <GameCard
                    data={gameData}
                    isScreenshotsShown={isScreenshotsShown}
                  />
                </ListItem>
              )
            )
          : "No Data"
        }
      </List>
  );
}

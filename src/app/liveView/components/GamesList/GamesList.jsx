"use client"

import * as React from 'react';
import {
  List,
  ListItem,
  Box
} from '@mui/material';

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
          : (
            <Box 
              sx={{marginTop: '5vh'}}
            >
              No Data Found
            </Box>
          )
        }
      </List>
  );
}

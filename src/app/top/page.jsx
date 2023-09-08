import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import {prisma} from '@/db';

import {GameCard} from './components';

export default async function TopChartsPage() {
  const gamesData = await prisma.game.findMany({take: 100});

  // const gamesData = [{
  //   id: '123456',
  //   name: 'Game Title',
  //   publisherName: 'Publisher',
  //   releaseDate: '2022-05-31T00:00:00.000Z',
  //   storeType: 'appstore',
  //   storeUrl: 'https://play.google.com/store/apps/details?id=sport.master.kickers&hl=en',
  //   gallery: '[["https://play-lh.googleusercontent.com/Z1ZCT-kdWbjvrJFwwX0dEj8k35I4ZqkJ77mz4lZVg8QYat9J1GqVL59yErUTyZFyCB4","https://play-lh.googleusercontent.com/K5v6BK50zJNRbsPyghyNRVH6zZgMvKwQbI4vmt2oQRZLvjN615P74cfxHMbiW70dUzc","https://play-lh.googleusercontent.com/uNCV54X8KaC-Un374GPqB1sT70Fp4-sCtBYqvx7vzcQMvUrXlXhzLUDMj4jAKZxqGA","https://play-lh.googleusercontent.com/E-_gDIQ7VpSYr2AwXA35qmFV3GdXdie7PQJyug65ZM8Gnx6xEXKMpDv0k4lCdmir3w","https://play-lh.googleusercontent.com/xi3WgOpUigxZwY5m-Vw4l57UwdT9RELRc_ngvDnGZqHxsQ4GCEyjD86McJZSE7yDsGCr","https://play-lh.googleusercontent.com/y4HOOpTD-1_T4u4GfShOymHAQRoBNFELnH-ue3Exdsd31-XMAI5ip_SaYRwlUHhDlR4","https://play-lh.googleusercontent.com/l28SONyMolwqRXlg9M4lWVIkB5Itqqt_FBy9HlDA35bwRcs3KhqD6mu1wmIrl-fE3-c","https://play-lh.googleusercontent.com/lNrioG3RJR4m5zRfdEAY6hyrxSAChxpIVs0Aup1WLqaqPIW5VqBd7_neZHAiCyUQ_As","https://play-lh.googleusercontent.com/DvByG_NZAUEj4dOzPW3KD-t2lglJT9aDZ7avzWohuUJvAHC_L5UsHOUQD-lL_eagF5VU"]]',
  //   icon: 'https://play-lh.googleusercontent.com/OP4neiFZEBcoEYoPq6tElMrPfffNDnAZHRemrCzQzKXKjreWLI8FFxg2XJ_UurApI68Q=s512'
  // }];

  return (
    <Container
      sx={{
        maxWidth: '1170px',
        margin: '0 auto',
        mt: '25px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'top',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: '1',
          p: '10px',
          minWidth: '300px'
        }}
      >
        <Typography variant="body1" gutterBottom>
            Search/Sort/Filter
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          flexGrow: '3',
          p: '10px'
        }}
      >
        <List sx={{width: '100%', maxWidth: '850px'}}>
          {gamesData.map(gameData => 
              (
                <ListItem key={gameData.id}>
                  <GameCard data={gameData} />
                </ListItem>
              )
            )}
        </List>
      </Box>
    </Container>
  );
}

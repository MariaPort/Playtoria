import * as React from 'react';
import { notFound } from 'next/navigation';
import {
  Backdrop,
  CircularProgress,
  Skeleton,
} from '@mui/material';
import { searchGameDataById } from '../../../actions';
import { AppInfoPage } from '../components';

export async function generateMetadata({
  params: { id },
}) {
  const response = await searchGameDataById(id);
  const gameData = response[0];
  return {
    title: gameData.name,
    // openGraph: {
    //   images: [
    //     {
    //       url: post.imageUrl
    //     }
    //   ]
    // }
  };
}

async function OverviewID({
  params: { id },
}) {
  let gameData = null;
  gameData = await searchGameDataById(id);

  if (gameData.length === 0) {
    return notFound();
  }

  return gameData
    ? (<AppInfoPage gameData={gameData[0]} />)
    : (
        <>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={!!gameData}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Skeleton
                sx={{
                  margin: '0 auto',
                  maxWidth: '1170px',
                }}
                style={{
                  marginBottom: '15px',
                  marginTop: '15px',
                }}
                variant="rounded"
                animation="vawe"
                height={215}
            />
            <Skeleton
                style={{
                  maxWidth: '1170px',
                  margin: '0 auto',
                  display: 'block',
                }}
                variant="rounded"
                animation="wave"
                height={350}
            />
        </>
    );
}

export default OverviewID;

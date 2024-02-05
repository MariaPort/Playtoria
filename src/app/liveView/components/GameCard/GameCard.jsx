import * as React from 'react';
import moment from 'moment';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Link as LinkMUI } from '@mui/material';
import ImageListItem from '@mui/material/ImageListItem';
import ImageList from '@mui/material/ImageList';
import { StyledLink } from '../../../../components';
import { DATE_FORMATS } from '../../../constants';

export function GameCard({ data, isScreenshotsShown }) {
  const {
    appId,
    name,
    publisherName,
    releaseDate,
    storeType,
    storeUrl,
    gallery,
    icon,
    isActive,
  } = data;

  const parsedDate = React.useMemo(() => moment(releaseDate).format(DATE_FORMATS.ddmmyyyy), [releaseDate]);

  const parsedGallery = React.useMemo(() => JSON.parse(gallery).flat(), [gallery]);

  return (
        <Box sx={{ width: '100%' }}>
            <Card>
                <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-evenly',
                    }}
                >
                    <CardContent>
                        <CardMedia
                            sx={{
                              width: { xs: '80px', md: '100px' },
                              height: { xs: '80px', md: '100px' },
                              borderRadius: '5px',
                            }}
                            component="img"
                            alt={name}
                            image={icon}
                        />
                    </CardContent>

                    <CardContent sx={{ flexGrow: '1' }}>
                        <Box
                            sx={{
                              display: 'flex',
                              flexDirection: { xs: 'column', md: 'row' },
                              justifyContent: 'space-between',
                              alignItems: 'baseline',
                              marginBottom: { xs: '10px' },
                            }}
                        >
                            <StyledLink href={`/overview/${appId}`} openInNewTab>
                                <Typography
                                        sx={{
                                          maxWidth: '360px',
                                          paddingRight: '5px',
                                          marginBottom: { xs: '0' },
                                        }}
                                        variant="h6"
                                        gutterBottom
                                >
                                    {name}
                                </Typography>
                            </StyledLink>

                            {
                                !!isActive && (
                                    <LinkMUI
                                        sx={{ width: '128px', textAlign: { xs: 'left', md: 'right' } }}
                                        target="_blank"
                                        variant="body2"
                                        href={storeUrl}
                                        // onClick={() => {
                                        //     console.info("To publisher's games list");
                                        // }}
                                    >
                                        {`View in ${storeType === 'appstore' ? 'App Store' : 'Google Play'}`}
                                    </LinkMUI>
                                )
                            }
                        </Box>

                        {/*
                        TODO: add publisher page
                        <Link
                            target="_blank"
                            variant="body1"
                            href="/"
                            // onClick={() => {
                            //     console.info("To publisher's games list");
                            // }}
                        >
                            {publisherName}
                        </Link> */}
                        <Typography variant="body1" gutterBottom>
                            {publisherName}
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                            Release date: {parsedDate}
                        </Typography>
                    </CardContent>
                </Box>
                {
                    isScreenshotsShown
                      ? (
                        <CardContent>
                            <ImageList
                                sx={{
                                  gridAutoFlow: 'column',
                                  gridTemplateColumns: 'repeat(auto-fill,minmax(160px, 200px)) !important',
                                  gridAutoColumns: 'minmax(160px, 200px)',
                                  overflowX: 'auto',
                                }}
                                >
                                    {parsedGallery.map((image, i) => (
                                        <ImageListItem key={i}>
                                            <img src={image} loading='lazy' />
                                        </ImageListItem>
                                    ))}
                            </ImageList>
                        </CardContent>
                      )
                      : null
                }
            </Card>
        </Box>
  );
}
